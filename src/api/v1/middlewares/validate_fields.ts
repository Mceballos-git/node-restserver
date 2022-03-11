import { validationResult } from 'express-validator';
import { badRequestResponse } from '../helpers/response_handler';
const { request, response } = require( 'express' );

// Check middleware validations
export const validateFields = ( req = request, res = response, next: any ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return badRequestResponse(res, errors)
    }
    next();
}



