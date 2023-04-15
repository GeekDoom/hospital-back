const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-img.helpers');

const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    //valid types
    const validTypes = ['hospitals', 'users', 'doctors'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid type'
        })
    }
    //File exists

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        })
    }
    //Image processing...
    const file = req.files.image;

    const cuttedName = file.name.split('.');
    const extFile = cuttedName[cuttedName.length - 1];

    //validate extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(extFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid extensión'
        })
    }

    //Generate the name of the file
    const fileName = `${uuidv4()}.${extFile}`;

    //Path to save the img
    const path = `./uploads/${type}/${fileName}`;

    // Move the img
    file.mv(path, (err) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                msg: 'Error moving the img: '
            })
        }

        //update DB
        updateImg(type, id, fileName);

        res.json({
            ok: true,
            msg: 'file uploaded successfully',
            fileName
        })
    });



}

const returnImg = (req, res = response) => {

    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);

    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }

}



module.exports = {
    fileUpload,
    returnImg
}