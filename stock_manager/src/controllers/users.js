const {request, response} = require('express');

const getMessage = (req = request, res = response) => {

res.send('Hello from the users controller!');

}

module.exports = {getMessage}