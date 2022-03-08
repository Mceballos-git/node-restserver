const { request, response } = require( 'express' );
const User = require( '../models/user_model' );
const bcrypt = require( 'bcryptjs' );

import { createJWT } from "../helpers/generate_jwt";
import { badRequestResponse, internalErrorResponse, sucessResponse, unauthorizedResponse } from '../helpers/ResponseHandler';

/**
 * Attempt to login.
 * @param req 
 * @param res 
 * @returns JsonResponse
 */
export const login = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email } );

        // Check if user exists
        if ( !user ) {
            return badRequestResponse( res, 'Invalid login credentials - email' )
        }

        // Check if active user
        if ( !user.active ) {
            return badRequestResponse( res, 'Invalid login credentials - User not active' )
        }

        // Check password
        const passOK = bcrypt.compareSync( password, user.password );
        if ( !passOK ) {
            return unauthorizedResponse( res, 'Invalid login credentials - pass' )
        }

        // JWT Generation
        const token = await createJWT( user.id );

        return sucessResponse( res, 'ok', { user, token } )

    } catch ( error ) {
        console.log( error );
        return internalErrorResponse( res, 'Server Error, please contact Administrators' )
    }
}

module.exports = { login }