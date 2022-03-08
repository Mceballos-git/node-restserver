const { request, response } = require( 'express' );
const Jwt = require( 'jsonwebtoken' );
const User = require( '../models/user_model' );


/**
 * Check if client send valid Token.
 * @param req 
 * @param res 
 * @param next 
 * @returns JsonResponse
 */
export const checkToken = async ( req = request, res = response, next: any ) => {
    
    // Verify if Token Exists in request header
    const token = req.header( 'x-token' );
    if ( !token ) {
        return res.status( 401 ).json( {
            msg: 'Invalid Token - No Token'
        } )
    }

    try {
        // Extract UID from JWT
        const { uid } = Jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );

        // Verify User Exists
        if ( !user ) {
            return res.status( 401 ).json( {
                msg: 'Invalid Token - User dont exists on DB'
            } )
        }

        // Verify if user is active
        if ( !user.active ) {
            return res.status( 401 ).json( {
                msg: 'Invalid Token - User is deactivated'
            } )
        }

        // I add the Logged User to the Request, so it already reaches the controller with that data
        req.user = user;

    } catch ( error ) {
        console.log( error );
        return res.status( 401 ).json( {
            msg: 'Invalid Token'
        } )

    }
    next();
}





