const { application } = require('express');
const {Server} = require('./server');

const server =  new Server();

server.start();
