const Jwt = require( 'jsonwebtoken' )

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