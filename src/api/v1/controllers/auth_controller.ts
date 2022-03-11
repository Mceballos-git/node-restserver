const { request, response } = require( 'express' );
const User = require( '../models/user_model' );
const bcrypt = require( 'bcryptjs' );

import { createJWT } from "../helpers/generate_jwt";
import { badRequestResponse, internalErrorResponse, unauthorizedResponse, loginSucessResponse } from '../helpers/response_handler';



const INVALID_EMAIL = 'Invalid login credentials - Email';
const USER_NOT_ACTIVE = 'Invalid login credentials - User not active';
const INVALID_PASSWORD = 'Invalid login credentials - Pass';
const INTERNAL_SERVER_ERROR = 'Server Error, please contact Administrators';

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
            return badRequestResponse( res, INVALID_EMAIL )
        }

        // Check if active user
        if ( !user.active ) {
            return badRequestResponse( res, USER_NOT_ACTIVE )
        }

        // Check password
        const passOK = bcrypt.compareSync( password, user.password );
        if ( !passOK ) {
            return unauthorizedResponse( res, INVALID_PASSWORD )
        }

        // JWT Generation
        const token = await createJWT( user.id );

        return loginSucessResponse( res, 'ok', user, token as string )

    } catch ( error ) {
        console.log( error );
        return internalErrorResponse( res, INTERNAL_SERVER_ERROR )
    }
}

module.exports = { login }