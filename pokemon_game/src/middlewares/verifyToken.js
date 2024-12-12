const {request, response} = require("express");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req = request, res = response, next) =>{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token){
        return res.status(401).send({message: "Token not provided"});
    }
    try{
        const playload =jwt.verify(token, secret);
        req.id = payload.id;
        req.isAdmin = playload.isAdmin;
        next();
    }catch(err){
        return res.status(403).send({message: "Token not valid"});
    }
}

module.exports = verifyToken;


