import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import { createJWT } from "../helpers/generate_jwt";
const User = require( '../models/user_model' );


export const login = async ( req: Request, res: Response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email } );

        // Check if user exists
        if ( !user ) {
            return res.status( 400 ).json( {
                msg: 'Invalid login credentials - email'
            } )
        }

        // Check if active user
        if ( !user.active ) {
            return res.status( 400 ).json( {
                msg: 'Invalid login credentials - active'
            } )
        }

        // Check password
        const passOK = bcrypt.compareSync( password, user.password );
        if (!passOK) {
            return res.status(400).json( {
                msg: 'Invalid login credentials - pass', 
            } )
        }

        // JWT Generation
        const token = await createJWT( user.id );

        return res.json({
            msg: 'Login Ok',
            user,
            token
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            msg: 'Server Error, please contact Administrators'
        } )
    }
}

module.exports = { login }