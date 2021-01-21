const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const StudentsController= require ('../controllers/students');

router.get("/",StudentsController.students_get_all);

router.post('/',StudentsController.students_create_student);

router.get('/:studentId',StudentsController.students_get_student);

router.patch('/:studentId',StudentsController.students_updates_student);

router.delete('/:studentId',StudentsController.students_delete_student);

module.exports = router;