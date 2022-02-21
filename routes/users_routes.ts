import { check } from "express-validator";
import { request, Router } from 'express';
import { validateFields } from '../middlewares/validate_fields';
import { ifMailExists, isValidRole } from '../helpers/db_validators';
import { UserSchema } from "../models/user";

const { usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete } = require( '../controllers/users_controller' );


export { }

const router = Router();

router.get( '/', usersGet );

router.post( '/', [
	check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password es obligatorio' ).not().isEmpty(),
	check( 'password', 'El password debe contener 6 carateres como minimo' ).isLength( { min: 6 } ),
	check( 'email' ).custom( ifMailExists ),
	check( 'email', 'El correo no es valido' ).isEmail(),
	// check( 'role', 'No es un rol valido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
	check( 'role' ).custom( isValidRole ),
	validateFields
], usersPost );

router.put( '/:id', usersPut );

router.patch( '/', usersPatch );

router.delete( '/', usersDelete );


module.exports = router;


