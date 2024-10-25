const express = require('express');
const userRoutes = require('./routes/users');

const app = express();


class Server{
    constructor(){
        this.app = express();
        this.port = 3000;

        this.app.use(express.json());

        this.routes();

    }   

routes(){
    this.app.use('/users', userRoutes);
}


    
start(){ 

    this.app.listen(this.port, ()=>{
        console.log(' Server listening on port' +this.port);
    });
   
    }
}

module.exports = {Server};

