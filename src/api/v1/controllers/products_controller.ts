const { request, response } = require( 'express' );
const { Product, Category } = require( '../models' );

import {
    sucessResponse,
    sucessfullCreationResponse,
} from '../helpers/response_handler';

/**
 * Get the list of all products, paginating with "limit" and displaying a range with "from".
 * @param req Optionals URL Query Parameter -> limit <number>
 * @param res JsonResponse
 */
const getProducts = async ( req = request, res = response ) => {
    // Extract filters from URL query params
    const { limit = 0, from = 0 } = req.query;

    // Filter only Active category
    const query = { active: true };

    const [ total, products ] = await Promise.all( [
        Product.countDocuments( query ),  // First promise correspond to "total".
        Product.find( query )             // Second promise correspond to "category".
            .populate( 'user', 'name' )   // Populate to display user name and not just the id.
            .populate( 'category', 'name' )
            .skip( from )                 // Serve data after a certain number.
            .limit( limit ),              // Limit for pagination.
    ] );

    // Response
    return sucessResponse( res, 'ok', { total, products } )
};

/**
 * Get Product by Id
 * @param req request
 * @param res JsonResponse
 */
const getProductById = async ( req = request, res = response ) => {
    // Receive the Request data from POST
    const { id } = req.params;
    const product = await Product.findById( id )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' );

    // Response
    return sucessResponse( res, 'ok', product );
};


/**
 * Create a new Resource (Category).
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const createProduct = async ( req = request, res = response ) => {
    // Receive the Request data from POST
    const { name, category, price, description } = req.body;
    console.log(category);
    

    // Search Category based on Category Name in request
    const { _id } = await Category.findOne( { name: category } );
    console.log(_id);

    // Generate data to save
    const data = {
        name: req.body.name.toUpperCase(),
        user: req.user._id,
        category: _id,
        price,
        description
    }

    // Create a new Category instance with the data
    const product = new Product( data );

    // Save to DB
    await product.save();

    // Populate User
    const productResp = await Product.findOne( { name: name.toUpperCase() } )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' );

    // Response
    return sucessfullCreationResponse( res, 'ok', productResp );
};

/**
 * Update Product.
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const updateProduct = async ( req: any, res = response ) => {
    // Receive the Request data from POST
    const { id } = req.params; // URL params
    const { active, user, ...data } = req.body; // Request body

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }
    if ( data.category ) {
        const { _id } = await Category.findOne( { name: data.category.toUpperCase() } );
        data.category = _id;
    }
    data.user = req.user._id

    // Find User
    const product = await Product.findByIdAndUpdate(
        id, data, { new: true } )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' );

    // Response
    return sucessResponse( res, 'ok', product );
};

/**
 * Delete Product
 * @param req 
 * @param res 
 * @returns JsonResponse
 */
const deleteProduct = async ( req: any, res = response ) => {
    // Product to Delete
    const { id } = req.params;

    // Soft Delete User
    const productDeleted = await Product.findByIdAndUpdate( id, { active: false }, { new: true } );

    // Response
    return sucessResponse( res, 'ok', productDeleted )
}



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}