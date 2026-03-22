const express = require('express');
const orderController = require('../controllers/order.controller');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

const router = express.Router();

const createOrderSchema = Joi.object({
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().valid('Cash on Delivery', 'Credit Card').default('Cash on Delivery')
});

// All order routes require authentication
router.use(protect);

router.post('/', validate(createOrderSchema), orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;
