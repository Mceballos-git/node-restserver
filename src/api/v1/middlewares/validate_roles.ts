const { request, response } = require( 'express' );
const Role = require( '../models/role_model' );


export const checkIsAdmin = ( req = request, res = response, next: any ) => {
    // Logged User is inside the request, from the previous middleware
    if ( !req.user ) {
        return res.status( 500 ).json( { msj: `You want to verify role without having verified token first` } );
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status( 401 ).json( { msj: `The user ${name} is not an administrator` } );
    }
    next();
}

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

export const checkIsValidRole = async ( req = request, res = response, next: any ) => {
    const role = req.body.role;
    
    const roleExists = await Role.findOne( { role } );
    if ( !roleExists ) {
        return res.status( 500 ).json( { msj: `The role ${role} dont exists` } );
    }
    next();
}