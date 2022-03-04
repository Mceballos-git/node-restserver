const { request, response } = require( 'express' );
const Jwt = require( 'jsonwebtoken' );
const User = require( '../models/user_model' );


// Check middleware validations
export const checkToken = async ( req = request, res = response, next: any ) => {
    const token = req.header( 'x-token' );

    // Verify Token Exists
    if ( !token ) {
        return res.status( 401 ).json( {
            msg: 'Invalid Token - No Token'
        } )
    }

    try {
        // Extraigo el UID del JWT
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

        // Agrego el Usuario Logueado al Request, asi ya llega al controlador con esa data
        req.user = user;

    } catch ( error ) {
        console.log( error );
        return res.status( 401 ).json( {
            msg: 'Invalid Token'
        } )

    }
    next();
}





