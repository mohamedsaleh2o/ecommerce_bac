const cartService = require('../services/cart.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  sendResponse(res, 200, cart, 'Cart loaded successfully.');
});

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user._id, productId, quantity);
  sendResponse(res, 200, cart, 'Item added to your cart.');
});

const removeFromCart = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const cart = await cartService.removeFromCart(req.user._id, productId);
  sendResponse(res, 200, cart, 'Item removed from your cart.');
});

const updateQuantity = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.updateQuantity(req.user._id, productId, quantity);
  sendResponse(res, 200, cart, 'Cart updated successfully.');
});

module.exports = { getCart, addToCart, removeFromCart, updateQuantity };
