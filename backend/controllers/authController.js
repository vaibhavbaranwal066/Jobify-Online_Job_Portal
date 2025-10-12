import userModel from '../models/userModel.js';

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next('Please provide all fields');
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next('Email already registered, please login');
  }
  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: 'User created successfully',
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next('Please provide all fields');
  }
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return next('Invalid username or password');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next('Invalid username or password');
  }
  user.password = undefined; // Hide password in response
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: 'Login successfully',
    user,
    token,
  });
};