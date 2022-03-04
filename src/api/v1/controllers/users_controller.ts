const { request, response } = require( 'express' );
const User = require( '../models/user_model' );
// const bcrypt = require( 'bcryptjs' );
import bcrypt from 'bcryptjs';

const usersGet = async ( req = request, res = response ) => {
    const { from = 0, limit = 0 } = req.query;
    const query = { active: true };

    // 97ms ambas llamadas por separado, primero una, luego la otra.
    // const users = await User.find( query ).skip( from ).limit( limit );
    // const total = await User.countDocuments( query );

    // 67ms usando Promise.all que hace ambas llamadas simultaneamente
    // y no termina hasta que ambas terminan ok
    const [ total, usuarios ] = await Promise.all( [
        User.countDocuments( query ), // Primera promesa corresponde a "total"
        User.find( query )            // Segunda promesa corresponde a "usuarios"
            .skip( from )
            .limit( limit ),
    ] )

    return res.json( {
        total,
        usuarios
    } ).status( 200 );
};


/**
 * 
 * @param req <string> name
 * @param req <string> email
 * @param req <string> password
 * @param req <string> name
 * @param req <string> google?
 * @param res 
 */
const usersPost = async ( req = request, res = response ) => {

    // Receive the Request data
    const { name, email, password, role } = req.body;

    // Create a new User instance with the Request data
    const user = new User( { name, email, password, role } );

    // Encrypt the password
    const salt = bcrypt.genSaltSync( 10 );
    user.password = bcrypt.hashSync( password, salt );

    // Save to DB
    await user.save();

    // Response
    res.json( {
        user
    } )
};

/**
 * 
 * @param req 
 * @param res 
 */
const usersPut = async ( req: any, res = response ) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        // Encrypt the password
        const salt = bcrypt.genSaltSync( 10 );
        rest.password = bcrypt.hashSync( password, salt );
    }
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );
    if ( !user ) {
        return res.json( { 'Error': 'User does not exist' } );
    }
    res.json( user );
};

const usersDelete = async ( req: any, res = response ) => {
    // User to Delete
    const { id } = req.params;
    const userToDelete = await User.findById( id );

    // Check if User to Delete Exists
    if ( !userToDelete ) {
        return res.json( { msj: `The user ${userToDelete.name} does not exists` } );
    }

    // Check if Active before Delete
    if ( !userToDelete.active ) {
        return res.json( { msj: `The user ${userToDelete.name} is already deleted` } );
    }

    // Soft Delete User
    const userDeleted = await User.findByIdAndUpdate( id, { active: false }, { new: true } );

    return res.json( { userDeleted } );
}



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}