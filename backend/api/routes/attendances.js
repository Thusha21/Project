const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AttendancesController= require ('../controllers/attendances');

router.get("/",AttendancesController.attendances_get_all);

router.post('/',AttendancesController.attendances_create_attendance);

router.get('/:attendanceId',AttendancesController.attendances_get_attendance);

router.patch('/:attendanceId',AttendancesController.attendances_updates_attendance);

router.delete('/:attendanceId',AttendancesController.attendances_delete_attendance);

module.exports = router;