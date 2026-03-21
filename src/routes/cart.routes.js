const express = require('express');
const cartController = require('../controllers/cart.controller');
const protect = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

const router = express.Router();

const cartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).default(1)
});

router.use(protect);

router.get('/', cartController.getCart);
router.post('/add', validate(cartSchema), cartController.addToCart);
router.post('/remove', validate(Joi.object({ productId: Joi.number().required() })), cartController.removeFromCart);
router.put('/update', validate(cartSchema), cartController.updateQuantity);

module.exports = router;
