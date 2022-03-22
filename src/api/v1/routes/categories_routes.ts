const Router = require( 'express' );
import { check } from "express-validator";

import { 
    checkIfCategoryNameIsAvailable, 
    checkIfCategoryIdExists, 
    checkIfCategoryIsActive 
} from '../validations/category_validations';
import { checkIfValidFrom, checkIfValidLimit } from '../validations/query_params_validators';
import { checkIsValidMongoId } from '../validations/user_validations';
import { checkIsHaveARole } from "../middlewares/validate_roles";


const {
    validateFields,
    checkToken,
} = require( '../middlewares' )

const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require( '../controllers/categories_controller' )


const router = Router();


/**
 * Get all categories
 */
router.get( '/', [
	check( 'limit' ).custom( checkIfValidLimit ),   // Optional query parameter validation, only Numbers
	check( 'from' ).custom( checkIfValidFrom ),     // Optional query parameter validation, only Numbers
    validateFields
], getCategories );


/**
 * Get category by id
 */
router.get( '/:id', [
    check( 'id' ).custom( checkIsValidMongoId ),
	check( 'id' ).custom( checkIfCategoryIdExists ),
    validateFields
], getCategoryById );


/**
 * Create new Category - Private (token), any role.
 */
router.post( '/', [
    checkToken,
	check( 'name', 'Name is required' ).not().isEmpty(),
	check( 'name' ).custom( checkIfCategoryNameIsAvailable ),
    validateFields
], createCategory );


/**
 * Update Category - Private (token), any role.
 */
router.put( '/:id', [
    checkToken,
    check( 'id' ).custom( checkIsValidMongoId ),
    validateFields,
	check( 'id' ).custom( checkIfCategoryIdExists ),
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'name' ).custom( checkIfCategoryNameIsAvailable ),
    validateFields
], updateCategory );


/**
 * Delete Category - Private, only Admin user.
 */
router.delete( '/:id', [
    checkToken,
	checkIsHaveARole( 'ADMIN_ROLE' ), // Only this roles can delete users
    check( 'id' ).custom( checkIsValidMongoId ),     // Si viene un ID no valido, se va en la verificacion debajo de esta linea.
    validateFields,
	check( 'id' ).custom( checkIfCategoryIdExists ), // Aca ya podemos buscar si existe o no, porque ya sabemos que es valido.
	check( 'id' ).custom( checkIfCategoryIsActive ),
    validateFields
], deleteCategory );



module.exports = router;