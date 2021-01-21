const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ClassesController= require ('../controllers/classes');

router.get("/", ClassesController.classes_get_all);

router.post('/',ClassesController.classes_create_class);

router.get('/:classId',ClassesController.classes_get_class);

router.patch('/:classId',ClassesController.classes_updates_class);

router.delete('/:classId',ClassesController.classes_delete_class);

module.exports = router;