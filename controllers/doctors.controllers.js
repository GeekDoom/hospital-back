const { response } = require('express');
const Doctor = require('../models/doctor.model')


const getDoctors = async (req, res = response) => {
    const doctorsDB = await Doctor.find().populate('user', 'name').populate('hospital', 'name')



    res.json({
        ok: true,
        doctorsDB
    })
}
const createDoctors = async (req, res = response) => {

    const uid = req.uid;
    const doctor = new Doctor({ user: uid, ...req.body });

    try {
        const doctorsDB = await doctor.save();

        res.json({
            ok: true,
            doctorsDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        })
    }
}
const updateDoctors = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'updateDoctors',
    })
}
const deleteDoctors = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'deleteDoctors',
    })
}



module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}