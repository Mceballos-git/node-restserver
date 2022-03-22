const { request, response } = require( 'express' );
const Role = require( '../models/role_model' );


const VERIFY_TOKEN_FIRST = 'You want to verify role without having verified token first';
const NOT_ADMINISTRATOR = 'The user is not an administrator';
const NOT_VALID_ROLE = 'Is not a valid role for this action';
const ROLE_DONT_EXISTS = 'The role dont exists';

/**
 * Check if User role is 'ADMIN_ROLE'
 * @param req request
 * @param res response
 * @param next nextFunction
 * @returns JsonResponse
 */
export const checkIsAdmin = ( req = request, res = response, next: any ) => {
    // Logged User is inside the request, from the previous middleware
    if ( !req.user ) {
        throw new Error( VERIFY_TOKEN_FIRST );
    }

    const { role } = req.user;

    // Check if ADMIN role
    if ( role !== 'ADMIN_ROLE' ) {
        throw new Error( NOT_ADMINISTRATOR );
    }
    next();
}

/**
 * Check that the role provided is within the roles allowed for this action.
 * @param roles 
 * @returns JsonResponse
 */
export const checkIsHaveARole = ( ...roles: any ) => {
    return ( req = request, res = response, next: any ) => {
        // Logged User is inside the request, from the previous middleware
        if ( !req.user ) {
            throw new Error( VERIFY_TOKEN_FIRST );
        }

        if ( !roles.includes( req.user.role ) ) {
            throw new Error( NOT_VALID_ROLE );
        }
        next();
    }
}

/**
 * Check that the provided role is a valid role.
 * @param req request
 * @param res response
 * @param next nextFunction
 * @returns JsonResponse
 */
export const checkIsValidRole = async ( req = request, res = response, next: any ) => {
    const role = req.body.role;

    const roleExists = await Role.findOne( { role } );
    if ( !roleExists ) {
        throw new Error( ROLE_DONT_EXISTS );
    }
    next();
}