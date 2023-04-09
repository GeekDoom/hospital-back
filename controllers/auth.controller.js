const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const { genJWT } = require('../helpers/jwt.helpers');


const login = async (req, res = response) => {

    //verify email
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'Credentials not valid, check your email or password',
            })
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials not valid, check your email or password'
            });
        }

        //Generate JWT
        const token = await genJWT(userDB.id);

        res.status(200).json({
            ok: true,
            msg: 'Login successful',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}


module.exports = {
    login,
}

