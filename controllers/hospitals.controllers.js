const { response } = require('express');
const Hospital = require('../models/hospital.model')


const getHospitals = async (req, res = response) => {

    const hospitalDB = await Hospital.find().populate('user', 'name')

    res.json({
        ok: true,
        hospitalDB
    })
}
const createHospitals = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ user: uid, ...req.body });
    try {



        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });

    }

}
const updateHospitals = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'updateHospitals',
    })
}
const deleteHospitals = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'deleteHospitals',
    })
}



module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}