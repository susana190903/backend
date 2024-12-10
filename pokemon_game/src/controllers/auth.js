const {request, response} = require('express');
const bcrypt= require('bcrypt');

const login = async (req =request, res= response)=> {
    const{email, password}=req.body

    if(!email || !password){
        res.status(400).send({
            message:"Some fields are missing"
        })
    }

    let conn;
    try{
        conn = await pool.Connection();
        const [user] = await conn.query(userQueries.getByEmail, [email]);

        if (!user){
            res.status(404).send({
                message: "User not found"
            })
            return;

        }

        const valid = await bcrypt.compare(password,user.password);

        if (!valid){
            res.status(401).send('Invalid credentials');
            return;
        }

        res.status(200).send({
            message: "Successfully logged in",
            user
        });

    }catch(err){
        res.status(500).send({error: err});
    }finally{
        if (conn){conn.close();}
    }

}

module.exports ={
    login,
}