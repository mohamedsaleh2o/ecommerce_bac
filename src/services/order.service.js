const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const { AppError } = require('../middlewares/error.middleware');

const createOrder = async (userId, orderData) => {
  const user = await User.findById(userId);
  
  if (!user.cart || user.cart.length === 0) {
    throw new AppError('Cannot place order with an empty cart', 400);
  }

  // 1. Calculate the total and capture current prices
  let totalAmount = 0;
  const orderItems = [];

  for (const item of user.cart) {
    const product = await Product.findOne({ id: item.productId });
    if (!product) {
      throw new AppError(`Product with ID ${item.productId} no longer exists`, 404);
    }
    
    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: product.price // Snapshot price at time of purchase
    });
    
    totalAmount += product.price * item.quantity;
  }

  // 2. Create the Order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress: orderData.shippingAddress || 'Not Provided',
    paymentMethod: orderData.paymentMethod || 'Cash on Delivery'
  });

  // 3. Clear the user's cart
  user.cart = [];
  await user.save();

  return order;
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  
  // Optionally populate product details if needed by frontend
  const populatedOrders = [];
  for (let order of orders) {
    const populatedItems = [];
    for (let item of order.items) {
        const product = await Product.findOne({ id: item.productId });
        populatedItems.push({
            product: product || { id: item.productId, title: 'Product removed' },
            quantity: item.quantity,
            priceAtPurchase: item.price
        });
    }
    
    // Convert to standard object to modify it
    const orderObj = order.toJSON();
    orderObj.items = populatedItems;
    populatedOrders.push(orderObj);
  }

  return populatedOrders;
};

const getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  return order;
};

// Admin only (You would add an admin middleware to use this route later)
const getAllOrders = async () => {
    return await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders
};
