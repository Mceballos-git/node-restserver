import mongoose from 'mongoose';
const User = require( '../models/user_model' );


const USER_ALREADY_REGISTERED = `Email is already registered`;
const USER_NOT_FOUND = `User not found`;
const USER_NOT_ACTIVE = `User already deleted`;

const EMPTY_MONGO_ID = `Empty ID isn't a valid Mongoose ID`;
const INVALID_MONGO_ID = `This isn't a valid Mongoose ID`;


export const checkIfUserEmailIsAvailable = async ( email: string = '' ) => {
    const existEmail = await User.findOne( { email } );
    if ( existEmail ) {
        throw new Error( USER_ALREADY_REGISTERED )
    }
}

export const checkIfUserIdExists = async ( id: string = '' ) => {
    const existUser = await User.findById( id );
    if ( !existUser ) {
        throw new Error( USER_NOT_FOUND )
    }
}

export const checkIfUserIsActive = async ( id: string = '' ) => {
    const existUser = await User.findById( id );
    if ( !existUser.active ) {
        throw new Error( USER_NOT_ACTIVE )
    }
}

export const checkIsValidMongoId = async ( id = '' ) => {
    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        throw new Error( INVALID_MONGO_ID );
    }
    if ( !id ) {
        throw new Error( EMPTY_MONGO_ID );
    }
}


module.exports = {
    checkIfUserEmailIsAvailable,
    checkIfUserIdExists,
    checkIsValidMongoId,
    checkIfUserIsActive
}