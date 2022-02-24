import mongoose from 'mongoose';
const ObjectId = require('mongoose').Types.ObjectId;
const Role = require( '../models/role_model' );
const User = require( '../models/user_model' );

export const checkIsValidRole = async ( role = '' ) => {
    const roleExists = await Role.findOne( { role } );
    if ( !roleExists ) {
        throw new Error( `The role '${role}' doesn't exist` );
    }
}

export const checkIfEmailExists = async ( email: string = '' ) => {
    const existEmail = await User.findOne( { email } );
    if ( existEmail ) {
        throw new Error( `The email ${email} is already registered` )
    }
}

export const checkIsValidId = async ( userId = '' ) => {
    if ( !userId ) {
        throw new Error( `Empty ID isn't a valid Mongoose ID` ); 
    }
    if ( !mongoose.Types.ObjectId.isValid( userId ) ) {
        throw new Error( `This isn't a valid Mongoose ID` );
    }
}

export const checkIfUserIdExists = async ( userId = '' ) => {
    const existsUser = await User.findById( userId );
    if ( !existsUser ) {
        throw new Error( `The user with ID '${userId}' doesn't exist` )
    }
}




module.exports = { checkIsValidRole, checkIfEmailExists, checkIsValidId, checkIfUserIdExists }