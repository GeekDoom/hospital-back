const { response } = require('express');
const User = require('../models/users.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');


const searchAll = async (req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i');


    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ])
    res.json({
        ok: true,
        msg: 'Searching',
        users,
        doctors,
        hospitals
    })

}
const getCollection = async (req, res = response) => {

    const search = req.params.search;
    const collection = req.params.collection;
    const regex = new RegExp(search, 'i');

    let data = [];

    switch (collection) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                .populate('user', 'name, img')
                .populate('hospital', 'name, img');

            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
                .populate('user', 'name, img')


            break;
        case 'users':

            data = await User.find({ name: regex });


            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Invalid collection'
            })


    }
    res.json({
        ok: true,
        results: data
    })

}


module.exports = {
    searchAll,
    getCollection,
}