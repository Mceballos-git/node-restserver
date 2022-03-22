import { SchemaTypes } from "mongoose";

const { Schema, model } = require( 'mongoose' );


export const Product = Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',  // Same value of UserModel
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String, default: '' },
    available: { type: Boolean, default: true },
} )

// Method to extract properties from the user object, it is not necessary to response that data.
Product.methods.toJSON = function() {
    const { __v, active, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Product', Product );