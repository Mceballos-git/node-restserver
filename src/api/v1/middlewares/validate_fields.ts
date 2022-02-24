import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';


// Check middleware validations
export const validateFields: RequestHandler = ( req, res, next ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( errors )
    }
    next();
}



