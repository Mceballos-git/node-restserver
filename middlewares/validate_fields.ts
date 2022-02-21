import { validationResult } from 'express-validator';
// import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';


 // Verificamos las validaciones de los middlewares
export const validateFields: RequestHandler = ( req, res, next ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( errors )
    }
    next();
}



// module.exports = {
//     validateFields
// }