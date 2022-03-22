const Category = require( '../models/category_model' );

const CATEGORY_ALREADY_REGISTERED = `The category name is already in use`;
const CATEGORY_NOT_FOUND = `Category not found in DB`;
const CATEGORY_NOT_ACTIVE = `Category already deleted`;
const CATEGORY_NOT_AVAILABLE = `Category is not available`;


export const checkIfCategoryNameIsAvailable = async ( name: string ) => {
    const existsCategory = await Category.findOne( { name } );
    if ( existsCategory ) {
        throw new Error( CATEGORY_ALREADY_REGISTERED )
    }
}

export const checkIfCategoryNameExists = async ( name: string ) => {
    const existsCategory = await Category.findOne( { name: name.toUpperCase() } );
    if ( !existsCategory ) {
        throw new Error( CATEGORY_NOT_AVAILABLE )
    }
}

export const checkIfCategoryIdExists = async ( id: string ) => {
    const existsCategory = await Category.findById( id )
    if ( !existsCategory ) {
        throw new Error( CATEGORY_NOT_FOUND )
    }
}

export const checkIfCategoryIsActive = async ( id: string = '' ) => {
    const existsCategory = await Category.findById( id );
    if ( !existsCategory.active ) {
        throw new Error( CATEGORY_NOT_ACTIVE )
    }
}

module.exports = {
    checkIfCategoryNameIsAvailable,
    checkIfCategoryNameExists,
    checkIfCategoryIdExists,
    checkIfCategoryIsActive
}