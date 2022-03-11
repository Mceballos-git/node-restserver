const Jwt = require( 'jsonwebtoken' )

/**
 * Create a new Jason Web Token based on User UID
 * @param uid 
 * @returns token <string>
 */
export const createJWT = ( uid: string ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };
        Jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, ( err: Error, token: string ) => {
            if ( err ) {
                console.log( err );
                reject( 'Error creating token' );
            }
            resolve( token );
        } )
    } )
}

module.exports = {
    createJWT
}