const productService = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.getProducts(req.query);
  sendResponse(res, 200, result.products, 'Products fetched successfully');
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(Number(req.params.id));
  sendResponse(res, 200, product, 'Product fetched successfully');
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  sendResponse(res, 201, product, 'Product created successfully');
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(Number(req.params.id), req.body);
  sendResponse(res, 200, product, 'Product updated successfully');
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(Number(req.params.id));
  sendResponse(res, 200, {}, 'Product deleted successfully');
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
