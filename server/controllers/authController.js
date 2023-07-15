const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/auth/register
//@access public
const register = asyncHandler( async(req, res,) => {
  const { username, email, first_name, last_name, password, password_confirm } = req.body;
  // User fields check
  if (!username || !email || !first_name || !last_name || !password || !password_confirm) {
    res.status(400);
    throw new Error('All fields are required');
  }
  // Confirm password
  if (password !== password_confirm) {
    res.status(400);
    throw new Error('Passwords do not match');
  }
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // Create new user
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      first_name,
      last_name,
    });
    res.status(201).json({
      id: user._id,
      email: user.email,
      firstName: user.first_name,
      lasName: user.last_name
    });
  } catch (err) {
    res.status(500).json('Error creating user: ' + err.message);
  }
});

//@desc Login a user
//@route POST /api/auth/login
//@access public
const login = async(req, res,) => {

};

const logout = async(req, res,) => {

};

const refresh = async(req, res,) => {

};

const user = async(req, res,) => {

};

module.exports = { register, login, logout, refresh, user };
