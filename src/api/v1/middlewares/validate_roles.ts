const { request, response } = require( 'express' );
const Role = require( '../models/role_model' );

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
        return res.status( 500 ).json( { msj: `You want to verify role without having verified token first` } );
    }

    const { role, name } = req.user;

    // Check if ADMIN role
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status( 401 ).json( { msj: `The user ${name} is not an administrator` } );
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
            return res.status( 500 ).json( { msj: `You want to verify role without having verified token first` } );
        }
        
        if ( !roles.includes( req.user.role ) ) {
            return res.status( 401 ).json( { msj: `The service requires one of these roles: ${roles}` } );
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
        return res.status( 500 ).json( { msj: `The role ${role} dont exists` } );
    }
    next();
}