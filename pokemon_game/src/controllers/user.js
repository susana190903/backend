const {request, response } = require('express');

const getAllUsers = async (req = request, res=response) => {
    let conn;
    

    try{

        conn= await pool.getConnection();
        const users = await

    }catch (err){

        res.status(500).json(err);
        return;

    }finally{

        if(conn)conn.end

    }
}