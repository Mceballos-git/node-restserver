import mongoose from 'mongoose';
const Role = require( '../models/role_model' );
const User = require( '../models/user_model' );



export const checkIfUserEmailExists = async ( email: string = '' ) => {
    const existEmail = await User.findOne( { email } );
    if ( existEmail ) {
        throw new Error( `The email ${email} is already registered` )
    }
}

export const checkIsValidUserId = async ( userId = '' ) => {
    if ( !userId ) {
        throw new Error( `Empty ID isn't a valid Mongoose ID` );
    }
    if ( !mongoose.Types.ObjectId.isValid( userId ) ) {
        throw new Error( `This isn't a valid Mongoose ID` );
    }
}


module.exports = { checkIfUserEmailExists, checkIsValidUserId }