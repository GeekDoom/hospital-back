/*
    Route: /api/todo/:search
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { searchAll, getCollection } = require('../controllers/search.controllers');


const router = Router();



router.get('/:search', validateJWT, searchAll);
router.get('/:collection/:search', validateJWT, getCollection);


module.exports = router;