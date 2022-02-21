const Role = require( '../models/role' );
const User = require( '../models/user' );

export const isValidRole = async ( role = '' ) => {
    const roleExists = await Role.findOne( { role } );
    if ( !roleExists ) {
        throw new Error( `El rol ${role} no esta registrado en la DB` );
    }
}

export const ifMailExists = async ( email: string = '' ) => {
    const existEmail = await User.findOne( { email } );
    if ( existEmail ) {
        throw new Error( `El email ${email} ya se encuentra registrado` )
    }
}

module.exports = { isValidRole, ifMailExists }