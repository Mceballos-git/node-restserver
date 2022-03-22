const bcrypt = require( 'bcryptjs' );


export const encryptPassword = ( password: string ) => {
    const salt = bcrypt.genSaltSync( 10 );
    const userPassword = bcrypt.hashSync( password, salt );
    return userPassword;
}

module.exports = encryptPassword