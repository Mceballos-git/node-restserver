const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

const { dbConnection } = require( '../config/database' );


export default class Server {
    app: any;
    port: string;
    apiVersion: number;
    apiFolder: string;
    usuariosPath: string;

    twoStepBackPath = path.join( __dirname, '../../' );


    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.apiVersion = 1;
        this.usuariosPath = '/api/users';
        this.apiFolder = `v${this.apiVersion}`

        // Conectar a DB
        this.DBConnect();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async DBConnect() {
        await dbConnection();
    }


    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static( 'src/public' ) );
    }


    routes() {
        this.app.use( this.usuariosPath, require( `../api/${this.apiFolder}/routes/users_routes` ) );
    }


    listen() {
        this.app.listen( this.port, () => console.log( 'Servidor corriendo en puerto', this.port ) );
    }
}

module.exports = Server;