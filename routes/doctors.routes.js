/*
Doctors
route: '/api/Doctors'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctors.controllers');
const router = Router();



router.get('/', getDoctors);


router.post(
    '/',
    [
        validateJWT,
        check('name', 'The hospital name is required').not().isEmpty(),
        check('specialization', 'The specialization is required').not().isEmpty(),
        check('hospital', 'The hospital must be valid').isMongoId(),
        validateFields
    ],
    createDoctors
);

router.put('/:id',
    [

    ],
    updateDoctors
);

router.delete('/:id', deleteDoctors);






module.exports = router;