const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require( '../database/config' );


export default class Server {
    app: any;
    port: string;
    usuariosPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.usuariosPath = '/api/users';

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        this.app.use( this.usuariosPath, require( '../routes/users_routes' ) );
    }

    listen() {
        this.app.listen( this.port, () => console.log( 'Servidor corriendo en puerto', this.port ) );
    }
}

module.exports = Server;