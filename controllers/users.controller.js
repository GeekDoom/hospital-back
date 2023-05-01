
const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const { genJWT } = require('../helpers/jwt.helpers');

const getUser = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const [userDB, total] = await Promise.all([
        User.find({}, 'name email role google active img')
            .skip(from)
            .limit(5),

        User.countDocuments()
    ])



    res.json({
        ok: true,
        userDB,
        total
    });
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;



    try {

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const userDB = new User(req.body);

        //Encrypt the password
        const salt = bcrypt.genSaltSync();
        userDB.password = bcrypt.hashSync(password, salt);

        await userDB.save();

        //Generate JWT
        const token = await genJWT(userDB.id)


        res.json({
            ok: true,
            userDB,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error... please read the logs'
        })
    }



}

const updateUser = async (req, res = response) => {


    //TODO: Validate token and check if the user is correct
    const uid = req.params.id;
    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        };

        const { password, google, email, ...fields } = req.body;
        if (userDB.email != email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'That email is already in use'
                });
            }
        }
        fields.email = email;

        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: userUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unespected error'
        })
    }
}

const delUser = async (req, res) => {

    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        };

        userDB.active = false;
        activeUser = userDB;
        const deactivateUser = await User.findByIdAndUpdate(uid, activeUser, { new: true })
        res.status(200).json({
            ok: true,
            msg: 'User successfully deleted'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unespected error... check the logs for more details'
        })
    }
}


module.exports = {
    getUser,
    createUser,
    updateUser,
    delUser
}