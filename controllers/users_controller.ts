import { request, response } from 'express';


const usersGet = ( req = request, res = response ) => {

    // Se asignan valores por defecto a q6 en caso que el request no lo traiga
    const {q1, q2, q6 = 10} = req.query;
    const {...params} = req.params;

    res.json( {
        msj: "get API - Controller",
        q1,q2, q6,
        params
    } )
};

const usersPost = ( req: any, res = response ) => {

    const { nombre, edad } = req.body;
    res.json( {
        msj: "post API - Controller",
        nombre,
        edad
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