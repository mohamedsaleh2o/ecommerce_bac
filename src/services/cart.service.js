const User = require('../models/User.model');
const Product = require('../models/Product.model');
const { AppError } = require('../middlewares/error.middleware');

const getCartDetails = async (user) => {
  let total = 0;
  const cartItems = [];
  for (const item of user.cart) {
    const product = await Product.findOne({ id: item.productId });
    if (product) {
      cartItems.push({
        product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      });
      total += product.price * item.quantity;
    }
  }
  return { items: cartItems, total };
};

const getCart = async (userId) => {
  const user = await User.findById(userId);
  return await getCartDetails(user);
};

const addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findOne({ id: productId });
  if (!product) throw new AppError('Product not found', 404);

  const user = await User.findById(userId);
  const cartItemIndex = user.cart.findIndex(item => item.productId === productId);

  if (cartItemIndex > -1) {
    user.cart[cartItemIndex].quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }

  await user.save();
  return await getCartDetails(user);
};

const removeFromCart = async (userId, productId) => {
  const user = await User.findById(userId);
  user.cart = user.cart.filter(item => item.productId !== productId);
  await user.save();
  return await getCartDetails(user);
};

const updateQuantity = async (userId, productId, quantity) => {
  const user = await User.findById(userId);
  const cartItemIndex = user.cart.findIndex(item => item.productId === productId);

  if (cartItemIndex > -1) {
    if (quantity <= 0) {
      user.cart = user.cart.filter(item => item.productId !== productId);
    } else {
      user.cart[cartItemIndex].quantity = quantity;
    }
    await user.save();
    return await getCartDetails(user);
  } else {
    throw new AppError('Product not in cart', 404);
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateQuantity };
