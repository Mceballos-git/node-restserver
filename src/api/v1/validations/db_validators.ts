import mongoose from 'mongoose';
const Role = require( '../models/role_model' );
const User = require( '../models/user_model' );



const ALREADY_REGISTERED = `Email is already registered`;
const EMPTY_MONGO_ID     = `Empty ID isn't a valid Mongoose ID`;
const INVALID_MONGO_ID   = `This isn't a valid Mongoose ID`;


export const checkIfUserEmailExists = async ( email: string = '' ) => {
    const existEmail = await User.findOne( { email } );
    if ( existEmail ) {
        throw new Error( ALREADY_REGISTERED )
    }
}

export const checkIsValidUserId = async ( userId = '' ) => {
    if ( !userId ) {
        throw new Error( EMPTY_MONGO_ID );
    }
    if ( !mongoose.Types.ObjectId.isValid( userId ) ) {
        throw new Error( INVALID_MONGO_ID );
    }
}


module.exports = { checkIfUserEmailExists, checkIsValidUserId }