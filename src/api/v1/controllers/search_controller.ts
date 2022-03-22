import { isValidObjectId } from 'mongoose';
import { sucessResponse, internalErrorResponse, badRequestResponse, sucessSearchResponse } from '../helpers/response_handler';
const { Product, Category, User, Role } = require( '../models' );

const { request, response } = require( 'express' );



const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

/**
 * Search Users by term
 * @param term 
 * @param res 
 * @returns 
 */
const searchUsers = async ( term = '', res = response ) => {
    const isMongoID = isValidObjectId( term );

    // Client search by UserID
    if ( isMongoID ) {
        const user = await User.findById( term );
        return sucessSearchResponse( res, user ? user : [] )
    }

    const regex = new RegExp( term, 'i' );

    // Search User by Name or Email
    const user = await User.find( {
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [
            { active: true }
        ]
    } );
    return sucessSearchResponse( res, user ? user : [] );
}

/**
 * Search Categories by term
 * @param term 
 * @param res 
 * @returns 
 */
const searchCategories = async ( term = '', res = response ) => {
    const isMongoID = isValidObjectId( term );

    // Category search by UserID
    if ( isMongoID ) {
        const category = await Category.findById( term ).populate( 'user', 'name' );
        return sucessSearchResponse( res, category ? category : [] )
    }

    const regex = new RegExp( term, 'i' );

    // Search Category by Name
    // const category = await Category.find( {
    //     $or: [ { name: regex } ],
    //     $and: [ { active: true } ]
    // } );
    const category = await Category.find( { name: regex, active: true } ).populate( 'user', 'name' );
    return sucessSearchResponse( res, category ? category : [] );
}

/**
 * Search Categories by term
 * @param term 
 * @param res 
 * @returns 
 */
const searchProducts = async ( term = '', res = response ) => {
    const isMongoID = isValidObjectId( term );

    // Category search by UserID
    if ( isMongoID ) {
        const product = await Product.findById( term )
        .populate( 'category', 'name' )
        .populate( 'user', 'name' );

        return sucessSearchResponse( res, product ? product : [] )
    }

    const regex = new RegExp( term, 'i' );

    // Search Product by Name or Description
    const product = await Product.find( {
        $or: [ { name: regex }, { description: regex } ],
        $and: [ { active: true } ]
    } )
    .populate( 'category', 'name' )
    .populate( 'user', 'name' );

    return sucessSearchResponse( res, product ? product : [] );
}

/**
 * @param req 
 * @param res JsonResponse
 */
const search = async ( req = request, res = response ) => {

    const { collection, term = '' } = req.params;

    if ( !allowedCollections.includes( collection ) ) {
        return badRequestResponse( res, 'The searched collection is not among the allowed ones.' )
    }

    switch ( collection ) {
        case 'users':
            searchUsers( term, res );
            break;

        case 'categories':
            searchCategories( term, res );
            break;

        case 'products':
            searchProducts( term, res );
            break;
            
        default:
            internalErrorResponse( res, 'You forgot to do this search...' )
            break;
    }
    // Response
    // return sucessResponse( res, 'ok', { collection, term } )
};

module.exports = {
    search
}