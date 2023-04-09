/*
    Path: '/api/login'
*/
const { Router } = require('express');

const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();




router.post('/',
    [
        check('email', 'The email address is required').isEmail(),
        check('password', 'The  password is required').not().isEmpty(),
        validateFields
    ],
    login
)





module.exports = router;