import { request, response } from 'express';
// const { request, response } = require( 'express' );
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

const User = require( '../models/user' );



const usersGet = ( req = request, res = response ) => {

    // Se asignan valores por defecto a q6 en caso que el request no lo traiga
    const { query, query2 } = req.query;
    const { ...params } = req.params;

    res.json( {
        msj: "get API - Controller",
        query, 
        query2,
        params
    } )
};

const usersPost = async ( req = request, res = response ) => {
    
    // Recibo los datos del Request
    const { name, email, password, role } = req.body;

    // Creo una nueva instancia de usuario con los datos del request
    const user = new User( { name, email, password, role } );

    // // Verificar si el correo existe
    // const existEmail = await User.findOne( { email } );
    // if ( existEmail ) {
    //     return res.status( 400 ).json( {
    //         msg: 'El correo ya se encuentra registrado'
    //     } )
    // }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync( 10 );
    user.password = bcrypt.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    // Respuesta
    res.json( {
        user
    } )
};

const usersPut = ( req: any, res = response ) => {

    const { id } = req.params
    res.json( {
        msj: "put API - Controller",
        id
    } )
};

const usersPatch = ( req: any, res = response ) => {
    res.json( {
        msj: "patch API - Controller"
    } )
};

const usersDelete = ( req: any, res = response ) => {
    res.json( {
        msj: "delete API - Controller"
    } )
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}