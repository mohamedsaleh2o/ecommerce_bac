const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/response');

const register = catchAsync(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  sendResponse(res, 201, { user, token }, 'User registered successfully');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  sendResponse(res, 200, { user, token }, 'Login successful');
});

module.exports = { register, login };
