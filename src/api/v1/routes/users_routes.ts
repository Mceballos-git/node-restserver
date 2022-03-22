const Router = require( 'express' );
import { check } from "express-validator";

import { checkIfValidLimit, checkIfValidFrom } from '../validations/query_params_validators';
import { 
	checkIfUserEmailIsAvailable, 
	checkIsValidMongoId, 
	checkIfUserIdExists, 
	checkIfUserIsActive 
} from '../validations/user_validations';

const {
	validateFields,
	checkToken,
	checkIsAdmin,
	checkIsHaveARole,
	checkIsValidRole
} = require( '../middlewares' )

const { 
	getUsers,
	createUser,
	updateUser,
	deleteUser 
} = require( '../controllers/users_controller' );

export { }



const router = Router();

/**
 * Get all Users
 */
router.get( '/', [
	check( 'limit' ).custom( checkIfValidLimit ), // Optional query parameter validation
	check( 'from' ).custom( checkIfValidFrom ),   // Optional query parameter validation
	validateFields
], getUsers );

/**
 * Create New User
 */
router.post( '/', [
	checkToken,
	check( 'name', 'Name is required' ).not().isEmpty(),
	check( 'password', 'Password is required' ).not().isEmpty(),
	check( 'password', 'The password must contain at least 6 characters' ).isLength( { min: 6 } ),
	check( 'email', 'The email is not valid' ).isEmail(),
	check( 'email' ).custom( checkIfUserEmailIsAvailable ),
	checkIsValidRole,
	validateFields
], createUser );

/**
 * Update User
 * ID is optional? so it doesn't fail if they send it empty, the first middleware is in charge of validating
 */
router.put( '/:id?', [
	checkToken,
	checkIsAdmin,
	check( 'id' ).custom( checkIsValidMongoId ),
	check( 'id' ).custom( checkIfUserIdExists ),
	checkIsValidRole,
	validateFields
], updateUser );

/**
 * Soft Delete User
 */
router.delete( '/:id?', [
	checkToken,
	checkIsHaveARole( 'ADMIN_ROLE' ), // Only this roles can delete users
	check( 'id' ).custom( checkIsValidMongoId ),
	check( 'id' ).custom( checkIfUserIdExists ),
	check( 'id' ).custom( checkIfUserIsActive ),
	validateFields
], deleteUser );


module.exports = router;


