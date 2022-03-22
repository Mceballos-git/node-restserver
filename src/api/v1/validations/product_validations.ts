const Product = require( '../models/product_model' );

const PRODUCT_ALREADY_REGISTERED = `The product name is already in use`;
const PRODUCT_NOT_FOUND = `Product not found in DB`;
const PRODUCT_NOT_ACTIVE = `Product already deleted`;


export const checkIfProductNameIsAvailable = async ( name: string ) => {
    const existsProduct = await Product.findOne( { name: name.toUpperCase() } );
    if ( existsProduct ) {
        throw new Error( PRODUCT_ALREADY_REGISTERED )
    }
}

export const checkIfProductIdExists = async ( id: string ) => {
    const existsProduct = await Product.findById( id )
    if ( !existsProduct ) {
        throw new Error( PRODUCT_NOT_FOUND )
    }
}

export const checkIfProductIsActive = async ( id: string = '' ) => {
    const existsProduct = await Product.findById( id );
    if ( !existsProduct.active ) {
        throw new Error( PRODUCT_NOT_ACTIVE )
    }
}

module.exports = {
    checkIfProductNameIsAvailable,
    checkIfProductIdExists,
    checkIfProductIsActive
}