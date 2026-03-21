const Product = require('../models/Product.model');

const getCategories = async () => {
  const categories = await Product.distinct('category');
  return categories;
};

module.exports = { getCategories };
