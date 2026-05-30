const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByNumber,
  getAllOrders,
  updateOrderStatus,
  checkPaymentStatus
} = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:order_number/payment-status', checkPaymentStatus);
router.get('/:order_number', getOrderByNumber);
router.patch('/:order_number/status', updateOrderStatus);

module.exports = router;