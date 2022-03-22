const Router = require( 'express' );
import { check } from "express-validator";

import { checkIfCategoryNameExists } from "../validations/category_validations";
import {
    checkIfProductNameIsAvailable,
    checkIfProductIdExists,
    checkIfProductIsActive
} from '../validations/product_validations';
import { checkIfValidFrom, checkIfValidLimit } from '../validations/query_params_validators';
import { checkIsValidMongoId } from '../validations/user_validations';
import { checkIsHaveARole } from "../middlewares/validate_roles";


const {
    validateFields,
    checkToken,
} = require( '../middlewares' )

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require( '../controllers/products_controller' )


const router = Router();


/**
 * Get all categories
 */
router.get( '/', [
    check( 'limit' ).custom( checkIfValidLimit ),   // Optional query parameter validation, only Numbers
    check( 'from' ).custom( checkIfValidFrom ),     // Optional query parameter validation, only Numbers
    validateFields
], getProducts );


/**
 * Get category by id
 */
router.get( '/:id', [
    check( 'id' ).custom( checkIsValidMongoId ),
    validateFields,
    check( 'id' ).custom( checkIfProductIdExists ),
    validateFields
], getProductById );


/**
 * Create new Category - Private (token), any role.
 */
router.post( '/', [
    checkToken,
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'name' ).custom( checkIfProductNameIsAvailable ),
    check( 'category', 'Category is required' ).not().isEmpty(),
    check( 'category' ).custom( checkIfCategoryNameExists ),
    check( 'price', 'Price is required' ).not().isEmpty(),
    validateFields
], createProduct );


/**
 * Update Category - Private (token), any role.
 */
router.put( '/:id', [
    checkToken,
    check( 'id' ).custom( checkIsValidMongoId ),
    validateFields,
    // check( 'category' ).optional().custom( checkIfCategoryNameExists ),     <-- Opcional, solo valida si viene
    check( 'id' ).custom( checkIfProductIdExists ),
    check( 'name' ).custom( checkIfProductNameIsAvailable ),
    validateFields
], updateProduct );


/**
 * Delete Category - Private, only Admin user.
 */
router.delete( '/:id', [
    checkToken,
    checkIsHaveARole( 'ADMIN_ROLE' ), // Only this roles can delete users
    check( 'id' ).custom( checkIsValidMongoId ),     // Si viene un ID no valido, se va en la verificacion debajo de esta linea.
    validateFields,
    check( 'id' ).custom( checkIfProductIdExists ), // Aca ya podemos buscar si existe o no, porque ya sabemos que es valido.
    check( 'id' ).custom( checkIfProductIsActive ),
    validateFields
], deleteProduct );



module.exports = router;