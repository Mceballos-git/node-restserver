const express = require( 'express' );
const cors = require( 'cors' );

const { dbConnection } = require( '../config/database' );


export default class Server {
    app: any;
    port: string;
    apiVersion: number;
    apiFolder: string;
    paths;

    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.apiVersion = 1;

        this.paths = {
            auth: '/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
        };

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
        this.app.use( this.paths.auth,       require( `../api/${this.apiFolder}/routes/auth_routes` ) );
        this.app.use( this.paths.categories, require( `../api/${this.apiFolder}/routes/categories_routes` ) );
        this.app.use( this.paths.products,   require( `../api/${this.apiFolder}/routes/products_routes` ) );
        this.app.use( this.paths.search,   require( `../api/${this.apiFolder}/routes/search_routes.ts` ) );
        this.app.use( this.paths.users,      require( `../api/${this.apiFolder}/routes/users_routes` ) );
    }


    listen() {
        this.app.listen( this.port, () => console.log( 'Servidor corriendo en puerto', this.port ) );
    }
}

module.exports = Server;