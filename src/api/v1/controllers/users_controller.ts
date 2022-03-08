import { sucessResponse, notFoundResponse, noContentResponse } from '../helpers/ResponseHandler';

const { request, response } = require( 'express' );
const User = require( '../models/user_model' );
const bcrypt = require( 'bcryptjs' );


/**
 * Get the list of users, paginating with "limit" and displaying a range with "from".
 * @param req Optionals URL Query Parameters -> from <number> - limit <number>
 * @param res JsonResponse
 */
const getUsers = async ( req = request, res = response ) => {
    // Extract filters from URL query params
    const { from = 0, limit = 0 } = req.query;

    // Filter only Active users
    const query = { active: true };

    const [ total, usuarios ] = await Promise.all( [
        User.countDocuments( query ), // Primera promesa corresponde a "total"
        User.find( query )            // Segunda promesa corresponde a "usuarios"
            .skip( from )
            .limit( limit ),
    ] );

    // Response
    return sucessResponse( res, 'ok', { total, usuarios } )
};


/**
 * Create a new User instance.
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const createUser = async ( req = request, res = response ) => {

    // Receive the Request data from POST
    const { name, email, password, role } = req.body;

    // Create a new User instance with the Request data
    const user = new User( { name, email, password, role } );

    // Encrypt the password
    const salt = bcrypt.genSaltSync( 10 );
    user.password = bcrypt.hashSync( password, salt );

    // Save to DB
    await user.save();

    // Response
    return sucessResponse( res, 'ok', user )
};

/**
 * Update User.
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const updateUser = async ( req: any, res = response ) => {
    // Receive the Request data from POST

    const { id } = req.params; // URL params
    const { _id, password, google, email, ...rest } = req.body; // Request body

    if ( password ) {
        // Encrypt the password
        const salt = bcrypt.genSaltSync( 10 );
        rest.password = bcrypt.hashSync( password, salt );
    }

    // Find User
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    // If not find User, return Empty Object
    if ( !user ) {
        return notFoundResponse( res, 'User does not exist' );
    }
    
    // Response
    return sucessResponse( res, 'ok', user )
};

/**
 * Delete User
 * @param req 
 * @param res 
 * @returns JsonResponse
 */
const deleteUser = async ( req: any, res = response ) => {
    // User to Delete
    const { id } = req.params;
    const userToDelete = await User.findById( id );

    // Check if User to Delete Exists
    if ( !userToDelete ) {
        return notFoundResponse( res, `The user ${userToDelete.name ??= ''} does not exists` )
    }

    // Check if Active before Delete
    if ( !userToDelete.active ) {
        return notFoundResponse( res, `The user ${userToDelete.name ??= ''} is already deleted` )
    }

    // Soft Delete User
    const userDeleted = await User.findByIdAndUpdate( id, { active: false }, { new: true } );

    // Response
    return sucessResponse( res, 'ok', userDeleted )
}



module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}