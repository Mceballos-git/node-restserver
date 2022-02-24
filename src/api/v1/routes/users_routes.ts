import { check } from "express-validator";
import { Router } from 'express';
import { checkIfValidLimit, checkIfValidFrom } from '../validations/query_params_validators';
import { checkIfEmailExists, checkIsValidRole, checkIsValidId, checkIfUserIdExists } from '../validations/db_validators';
import { validateFields } from "../middlewares/validate_fields";

const { usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete } = require( '../controllers/users_controller' );

export { }

const router = Router();

router.get( '/', [
	check( 'limit' ).custom( checkIfValidLimit ), // Optional query parameter validation
	check( 'from' ).custom( checkIfValidFrom ),   // Optional query parameter validation
	validateFields
], usersGet );

router.post( '/', [
	check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password debe contener 6 carateres como minimo' ).isLength( { min: 6 } ),
	check( 'email' ).custom( checkIfEmailExists ),
	check( 'email', 'El correo no es valido' ).isEmail(),
	check( 'role' ).custom( checkIsValidRole ),
	validateFields
], usersPost );


// ID is optional? so it doesn't fail if they send it empty, the first middleware is in charge of validating
router.put( '/:id?', [ 
	check( 'id' ).custom( checkIsValidId ),
	check( 'role' ).custom( checkIsValidRole ), // It begins to be required to send the role
	validateFields
], usersPut );


router.delete( '/:id?', [
	check( 'id' ).custom( checkIsValidId ),
	validateFields
],usersDelete );


module.exports = router;


