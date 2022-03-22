import { SchemaTypes } from "mongoose";

const { Schema, model } = require( 'mongoose' );


export const Category = Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true
    },
    active: {
        type: Boolean,
        default: true,
        // required: [ true, 'Category is required' ]
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',  // Same value of UserModel
        required: true
    },
} )

// Method to extract properties from the user object, it is not necessary to response that data.
Category.methods.toJSON = function() {
    const { __v, active, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Category', Category );