const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middlewares/error.middleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    cart: []
  });
  const token = generateToken(user._id);
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }
  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { register, login };
