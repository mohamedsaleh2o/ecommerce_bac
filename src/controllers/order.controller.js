const orderService = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body);
  sendResponse(res, 201, order, 'Checkout complete! Your order has been placed successfully.');
});

const getUserOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user._id);
  sendResponse(res, 200, orders, 'Order history loaded.');
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.user._id, req.params.id);
  sendResponse(res, 200, order, 'Order details loaded.');
});

module.exports = { createOrder, getUserOrders, getOrderById };
