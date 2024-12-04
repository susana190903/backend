const {request, response} = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/connection');
const {userQueries} = require('../models/users');

const saltRounds = 10;

const getAllUsers = async (req = request, res=response) => {
    let conn;

    try{
        conn=await pool.getConnection();
        const users = await conn.query(userQueries.getAll);

        res.json(users);
        return;
    }catch(err){
        res.status(500).json(err);
        return;

    }finally{
        if(conn) conn.end()

    }
};
const getUserById = async (req = request, res= response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(userQueries.getById, [+id]);
        if(!user){
            res.status(404).send('User not found')
            return;
        }
    
    res.send(user);
    }catch (error){
        res.status(500).send(error);
    }finally{
        if(conn) conn.end();
    }

    //const user = users.find(user => user.id === +id);
    
}
//agregar un usuario
const CreateUser = async (req = request, res = response) => {
    const { first_name, last_name, email, password} = req.body;

    if (!first_name || !last_name || !email || !password) {
        res.status(400).send('Bad Request. Some fields are missing');
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();
        const [user_exits] = await conn.query(userQueries.getByEmail, [email]);
        if(user_exits){
            res.status(409).send('Username already exits');
            return;
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await conn.query(userQueries.create, [first_name, last_name, email, hashPassword]);
        if(newUser.affectedRows ===0){
            res.status(500).send('Error adding user');
            return;
        }
        res.status(201).send("user created succefully");
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if(conn) conn.end();
    }

}


module.exports = {
    getAllUsers,
    getUserById,
    CreateUser,

};