const { request, response } = require( 'express' );
const { User } = require( '../models' );

const encryptPassword = require( '../helpers/encrypt_password' );

import { sucessResponse, sucessfullCreationResponse } from '../helpers/response_handler';



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
        User.countDocuments( query ), // First promise correspond to "total"
        User.find( query )            // Second promise correspond to "usuarios"
            .skip( from )
            .limit( limit ),
    ] );

    // Response
    return sucessResponse( res, 'ok', { total, usuarios } )
};


/**
 * Create a new Resource (User).
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
    user.password = encryptPassword( password );

    // Save to DB
    await user.save();

    // Response
    return sucessfullCreationResponse( res, 'ok', user )
};


/**
 * Update User.
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const updateUser = async ( req: any, res = response ) => {

    // Receive the Request data from POST
    const { id } = req.params;                                      // URL params
    const { _id, password, google, email, ...rest } = req.body;     // Body params

    if ( password ) { // Just in case you want to change the password
        rest.password = encryptPassword( password );
    }

    // Find User
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

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