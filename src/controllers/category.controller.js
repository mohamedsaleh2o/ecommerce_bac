const categoryService = require('../services/category.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  sendResponse(res, 200, categories, 'Categories fetched successfully');
});

module.exports = { getCategories };
