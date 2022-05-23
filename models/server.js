const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config()

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = 'ap/usuarios';
        //Rutas
        this.routes();

        this.middleware();
    
    }
    async conectarDB() { 
        await dbConnection()
    }
    //middleware
    middleware() { 
        //cors
        this.app.use(cors());
       
        //directorio publico
        this.app.use(express.static("public"));

        //lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

    }
    

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;