/*
    Route: /api/uploads/
*/

const { Router } = require('express');
const efu = require('express-fileupload');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImg } = require('../controllers/uploads.controllers');



const router = Router();

router.use(efu());


router.put('/:type/:id', validateJWT, fileUpload);

router.get('/:type/:img', validateJWT, returnImg);

/*
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));
*/


module.exports = router;