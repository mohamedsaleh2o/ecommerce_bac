const express = require('express');
const categoryController = require('../controllers/category.controller');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:category', (req, res, next) => {
  req.query.category = req.params.category;
  productController.getProducts(req, res, next);
});

module.exports = router;
