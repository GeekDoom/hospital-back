const fs = require('fs');

const User = require('../models/users.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const ereaseImg = (path) => {
    if (fs.existsSync(path)) {
        //Erease the old img
        fs.unlinkSync(path);
    }
}


const updateImg = async (type, id, fileName) => {

    let oldPath = '';


    switch (type) {

        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            }

            oldPath = `./uploads/doctors/${doctor.img}`;
            ereaseImg(oldPath);

            doctor.img = fileName;
            await doctor.save();
            return true;

            break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            ereaseImg(oldPath);

            hospital.img = fileName;
            await hospital.save();
            return true;


            break;


        case 'users':


            const user = await User.findById(id);
            if (!user) {
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            ereaseImg(oldPath);

            user.img = fileName;
            await user.save();
            return true;


            break;

    }


}


module.exports = {
    updateImg
}

