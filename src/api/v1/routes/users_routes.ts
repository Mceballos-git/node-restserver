const Router = require( 'express' );
import { check } from "express-validator";

import { checkIfValidLimit, checkIfValidFrom } from '../validations/query_params_validators';
import { checkIfUserEmailExists, checkIsValidUserId } from '../validations/db_validators';

const {
	validateFields,
	checkToken,
	checkIsAdmin,
	checkIsHaveARole,
	checkIsValidRole
} = require( '../middlewares' )

const { usersGet,
	usersPost,
	usersPut,
	usersDelete } = require( '../controllers/users_controller' );

export { }

const router = Router();

router.get( '/', [
	check( 'limit' ).custom( checkIfValidLimit ), // Optional query parameter validation
	check( 'from' ).custom( checkIfValidFrom ),   // Optional query parameter validation
	validateFields
], usersGet );

router.post( '/', [ // 
	check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password debe contener 6 carateres como minimo' ).isLength( { min: 6 } ),
	check( 'email', 'El correo no es valido' ).isEmail(),
	check( 'email' ).custom( checkIfUserEmailExists ),
	checkIsValidRole,
	validateFields
], usersPost );


// ID is optional? so it doesn't fail if they send it empty, the first middleware is in charge of validating
router.put( '/:id?', [
	checkToken,
	checkIsAdmin,
	check( 'id' ).custom( checkIsValidUserId ),
	checkIsValidRole,
	validateFields
], usersPut );


router.delete( '/:id?', [
	checkToken,
	// checkIsAdmin, 							   // Only Admins can delete users
	checkIsHaveARole( 'ADMIN_ROLE', 'VENTAS_ROLE' ), // Only this roles can delete users
	check( 'id' ).custom( checkIsValidUserId ),
	validateFields
], usersDelete );


module.exports = router;


