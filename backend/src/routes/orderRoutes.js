const express = require('express');
const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, getOrders);
router.post('/', requireAuth, createOrder);
router.patch('/:id/status', requireAuth, requireAdmin, updateOrderStatus);

module.exports = router;
