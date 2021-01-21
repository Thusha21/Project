const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TeachersController= require ('../controllers/teachers');

router.get("/",TeachersController.teachers_get_all);

router.post('/',TeachersController.teachers_create_teacher);

router.get('/:teacherId',TeachersController.teachers_get_teacher);

router.patch('/:teacherId',TeachersController.teachers_updates_teacher);

router.delete('/:teacherId',TeachersController.teachers_delete_teacher );

module.exports = router;