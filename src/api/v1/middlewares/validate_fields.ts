import { validationResult } from 'express-validator';
const { request, response } = require( 'express' );

// Check middleware validations
export const validateFields = ( req = request, res = response, next: any ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( errors )
    }
    next();
}



