const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PaymentsController= require ('../controllers/payments');

router.get("/",PaymentsController.payments_get_all);

router.post('/',PaymentsController.payments_create_payment);

router.get('/:paymentId',PaymentsController.payments_get_payment);

router.delete('/:paymentId',PaymentsController.payments_delete_payment);

module.exports = router;