const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const { genJWT } = require('../helpers/jwt.helpers');
const { googleVerify } = require('../helpers/google-verify.helpers');


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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;


    try {
        const { email, name, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });
        let user;
        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true

            });
        } else {
            user = userDB;
            user.google = true;
        }
        //save user
        await user.save();

        //Generate JWT
        const token = await genJWT(user.id);
        res.json({
            ok: true,
            email, name, picture,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Google token is invalid'
        })
    }



}


module.exports = {
    login,
    googleSignIn
}

