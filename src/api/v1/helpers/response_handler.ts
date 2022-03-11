import { StringSchemaDefinition } from "mongoose";

const { response } = require( 'express' );

/**
 * This trait will handle all the HTTP response needed in the application. This way, will have
 * centralized control about codes, names and return types.
 */


/**
 * Format and return a JSON response with Corresponding HTTP code.
 * @param res response
 * @param data object
 * @param statusCode number
 * @return json
 */
export const jsonResponse = ( res = response, data: object, statusCode: number = 500 ) => {
    return res.status( statusCode ).json( data );
}


/**
 * The server successfully processed the request.
 * @param res 
 * @param data 
 * @returns json
 */
export const sucessResponse = ( res = response, msj: string, data?: object ) => {
    return res.status( 200 ).json( {
        msj,
        data
    } );
}

/**
 * Login Sucessfull Response.
 * @param res 
 * @param data 
 * @returns json
 */
export const loginSucessResponse = ( res = response, msj: string, user: any, token: string ) => {
    return res.status( 200 ).json( {
        msj,
        user,
        token
    } );
}

/**
 * Created Sucessfull Response
 * @param res 
 * @param data 
 * @returns json
 */
 export const sucessfullCreationResponse = ( res = response, msj: string, data?: object ) => {
    return res.status( 201 ).json( {
        msj,
        data
    } );
}


/**
 * Create a Response with standard format for errors.
 * @param res 
 * @param title 
 * @param msj 
 * @param data 
 * @param statusCode 
 * @returns json
 */
export const returnErrorResponse = ( res = response, title: string, msj: any, statusCode: number ) => {
    const responseData = {
        'error': title,
        'details': msj,
        'status_code': statusCode
    }
    return res.status( statusCode ).json( responseData )
}


/**
 * Return a Bad Request response with errors information.
 * @param res 
 * @param data 
 * @returns json
 */
export const badRequestResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '400 - BAD REQUEST', msg, 400 )
}


/**
 * The server has successfully fulfilled the request and that there is no additional content to send in the response body
 * @param res 
 * @param data 
 * @returns json
 */
 export const noContentResponse = ( res = response ) => {
    return res.status( 204 ).json( {} );
}


/**
 * Request is good, but cannot be processed due invalid content.
 * @param res 
 * @param data 
 * @returns json
 */
export const unprocessableRequest = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '422 - UNPROCESSABLE ENTITY', msg, 422 )
}


/**
 * The server could not find what was requested.
 * @param res 
 * @param data 
 * @returns json
 */
export const notFoundResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '404 - NOT FOUND', msg, 404 )
}


/**
 * The request has not been applied because it lacks valid authentication credentials for the target resource.
 * @param res 
 * @param data 
 * @returns json
 */
export const unauthorizedResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '401 - UNAUTHORIZED', msg, 401 )
}


/**
 * The server understood the request, but is refusing to fulfill it.
 * @param res 
 * @param data 
 * @returns json
 */
export const forbiddenResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '403 - FORBIDDEN', msg, 403 )
}


/**
 * The server encountered an unexpected condition that prevented it from fulfilling the request.
 * @param res 
 * @param data 
 * @returns json
 */
export const internalErrorResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '500 - INTERNAL ERROR', msg, 500 )
}


/**
 * The server knows the request method, but the target resource doesn't support this method.
 * @param res 
 * @param data 
 * @returns json
 */
export const methodNotAllowedResponse = ( res = response, msg: any ) => {
    return returnErrorResponse( res, '405 - METHOD NOT ALLOWED', msg, 405 )
}