const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
const { userQueries } = require('../models/users');

require('dotenv').config();

const secrets = process.env.SECRET;

const saltRounds = 10;

const userProtected = async (req = request, res = response) => {
    res.send({message: "You have access!!"});
}

const getAllUsers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query(userQueries.getAll);
        res.json(users);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
};

const getUserById = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(userQueries.getById, [+id]);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const get3RandomPokemons = async (req = request, res = response) => {
        let conn;
    try{
        conn= await pool.getConnection();
        const pokemons = await conn.query(pokemonsModel.get3RandomPokemons);
    }catch(error){
        res.status(500).send(error);
        return;

    }finally{
        if (conn) conn.end();
    }
}

const CreateUser = async (req = request, res = response) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        res.status(400).send('Bad Request. Some fields are missing');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const [user_exists] = await conn.query(userQueries.getByEmail, [email]);
        if (user_exists) {
            res.status(409).send('Email already exists');
            return;
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await conn.query(userQueries.create, [first_name, last_name, email, hashPassword]);
        if (newUser.affectedRows === 0) {
            res.status(500).send('Error adding user');
            return;
        }
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    if (isNaN(id)) {
        res.status(400).send("Invalid ID");
        return;
    }
    if (!first_name || !last_name || !email) {
        res.status(400).send("At least one field is required for update");
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(userQueries.getById, [+id]);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const [emailExist] = await conn.query(userQueries.emailvalid, [email, id]);
        if (emailExist) {
            res.status(409).send({ message: 'Email already in use' });
            return;
        }
        const { affectedRows } = await conn.query(userQueries.editUser, [first_name, last_name, email, id]);
        if (affectedRows === 0) {
            res.status(500).send({ message: 'User not updated' });
            return;
        }
        res.send("User updated successfully");
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

const destroyUser = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send({ message: 'Invalid ID' });
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(userQueries.getById, [+id]);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        const { affectedRows } = await conn.query(userQueries.deleteUser, [id]);
        if (affectedRows === 0) {
            res.status(500).send({ message: 'Error deleting user' });
            return;
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    CreateUser,
    updateUser,
    destroyUser,
    userProtected,

};
