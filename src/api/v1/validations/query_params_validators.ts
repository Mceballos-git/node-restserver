/**
 * Check if value passed on "limit" query param, is a Number.
 * @param limit number
 * @returns JsonResponse
 */
export const checkIfValidLimit = async ( limit: number = 0 ) => {
    if ( !limit ) return true;
    if ( !Number(limit) ) {
        throw new Error( `Invalid "limit" query parameter, must be a Number` );
    }
}


/**
 * Check if value passed on "from" query param, is a Number.
 * @param from number
 * @returns JsonResponse
 */
export const checkIfValidFrom = async ( from: number = 0 ) => {
    if ( !from ) return true;
    if ( !Number(from) ) {
        throw new Error( `Invalid "from" query parameter, must be a Number` );
    }
}


module.exports = {
    checkIfValidLimit,
    checkIfValidFrom
}