const Product = require('../models/Product.model');
const { AppError } = require('../middlewares/error.middleware');

const getProducts = async (query) => {
  const { category, search, page = 1, limit = 20 } = query;
  let filter = {};
  
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (page - 1) * limit;
  const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
  const total = await Product.countDocuments(filter);
  
  return {
    products,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    }
  };
};

const getProductById = async (id) => {
  const product = await Product.findOne({ id });
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

const createProduct = async (productData) => {
  const existing = await Product.findOne({ id: productData.id });
  if (existing) throw new AppError('Product with this id already exists', 400);
  return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
  const product = await Product.findOneAndUpdate({ id }, productData, { new: true, runValidators: true });
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findOneAndDelete({ id });
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
