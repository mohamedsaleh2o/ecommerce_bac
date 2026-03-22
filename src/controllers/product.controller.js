const productService = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');
const { AppError } = require('../middlewares/error.middleware');

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.getProducts(req.query);
  sendResponse(res, 200, result.products, 'Products fetched successfully');
});

const getProductById = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next(new AppError('Invalid product ID', 400));
  
  const product = await productService.getProductById(id);
  sendResponse(res, 200, product, 'Product fetched successfully');
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  sendResponse(res, 201, product, 'Product created successfully');
});

const updateProduct = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next(new AppError('Invalid product ID', 400));

  const product = await productService.updateProduct(id, req.body);
  sendResponse(res, 200, product, 'Product updated successfully');
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next(new AppError('Invalid product ID', 400));

  await productService.deleteProduct(id);
  sendResponse(res, 200, {}, 'Product deleted successfully');
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
