const { request, response } = require( 'express' );
const { Category } = require( '../models' );

import {
    sucessResponse,
    sucessfullCreationResponse,
} from '../helpers/response_handler';

/**
 * Get the list of all categories, paginating with "limit" and displaying a range with "from".
 * @param req Optionals URL Query Parameter -> limit <number>
 * @param res JsonResponse
 */
const getCategories = async ( req = request, res = response ) => {
    // Extract filters from URL query params
    const { limit = 0, from = 0 } = req.query;

    // Filter only Active category
    const query = { active: true };

    const [ total, categories ] = await Promise.all( [
        Category.countDocuments( query ), // First promise correspond to "total".

        Category.find( query )            // Second promise correspond to "category".
            .populate( 'user', 'name' )   // Populate to display user name and not just the id.
            .skip( from )                 // Serve data after a certain number.
            .limit( limit ),              // Limit for pagination.
    ] );

    // Response
    return sucessResponse( res, 'ok', { total, categories } )
};

/**
 * Get Category by Id
 * @param req request
 * @param res JsonResponse
 */
const getCategoryById = async ( req = request, res = response ) => {
    // Receive the Request data from POST
    const { id } = req.params;
    const category = await Category.findById( id ).populate( 'user', 'name' );

    // Response
    return sucessResponse( res, 'ok', category );
};


/**
 * Create a new Resource (Category).
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const createCategory = async ( req = request, res = response ) => {
    // Receive the Request data from POST
    const name = req.body.name.toUpperCase();

    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }

    // Create a new Category instance with the data
    const category = new Category( data );

    // Save to DB
    await category.save();

    // Populate User
    const categoryResp = await Category.findOne( { name } ).populate( 'user', 'name' );

    // Response
    return sucessfullCreationResponse( res, 'ok', categoryResp );
};

/**
 * Update Category.
 * @param req request
 * @param res response
 * @return JsonResponse
 */
const updateCategory = async ( req: any, res = response ) => {
    // Receive the Request data from POST
    const { id } = req.params; // URL params
    const { active, user, ...data } = req.body; // Request body

    data.name = data.name.toUpperCase();
    data.user = req.user._id

    // Find User
    const category = await Category.findByIdAndUpdate(
        id, data, { new: true } )
        .populate( 'user', 'name' );

    // Response
    return sucessResponse( res, 'ok', category )
};

/**
 * Delete Category
 * @param req 
 * @param res 
 * @returns JsonResponse
 */
const deleteCategory = async ( req: any, res = response ) => {
    // Category to Delete
    const { id } = req.params;

    // Soft Delete User
    const categoryDeleted = await Category.findByIdAndUpdate( id, { active: false }, { new: true } );

    // Response
    return sucessResponse( res, 'ok', categoryDeleted )
}



module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}