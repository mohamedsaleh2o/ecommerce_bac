const express = require('express');
const productController = require('../controllers/product.controller');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

const router = express.Router();

const productSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().uri().required(),
  rating: Joi.object({
    rate: Joi.number().required(),
    count: Joi.number().required()
  }).required()
});

router.get('/search/:query', (req, res, next) => {
  req.query.search = req.params.query;
  productController.getProducts(req, res, next);
});

router.route('/')
  .get(productController.getProducts)
  .post(validate(productSchema), productController.createProduct);

router.route('/:id')
  .get(productController.getProductById)
  .put(validate(productSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
