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
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    first_name,
    last_name,
  });
  if (user) {
  res.status(201).json({
    id: user._id,
    email: user.email,
    firstName: user.first_name,
    lasName: user.last_name
  });
  } else {
    res.status(500).json('Error creating user: ' + err.message);
  }
});

//@desc Login a user
//@route POST /api/auth/login
//@access public
const login = asyncHandler( async(req, res,) => {
  const { email, password } = req.body;
  // User fields check
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('User not regitsered.');
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    // Access token
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    // Refersh token
    const refreshToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    // Save Refresh token in db
    user.refresh_token = refreshToken;
    user.save();

    // create a httpOnly cookie for refresh token
    res.cookie(
      'refresh_token',
      refreshToken,
      { httpOnly: true, maxAge: 24*60*60*1000 }
      // { httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true }
    );

    res.status(200).json({ access_token: accessToken });
  } else {
    res.status(401);
    throw new Error('Password not Valid.');
  }
});

//@desc Logout a user
//@route POST /api/auth/logout
//@access public
const logout = asyncHandler( async(req, res,) => {
  const cookies = req.cookies;
  // Check for refresh token
  if (!cookies.refresh_token) {
    res.status(204);
    throw new Error('Refresh token not valid.');
  } 

  const refreshToken = cookies.refresh_token;
  const user = await User.findOne({ refresh_token: refreshToken });
  // Check if user exists
  if (!user) {
    // Clear cookies and send the error response
    res.clearCookie('refresh_token', { httpOnly: true });
    // res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204);
    throw new Error('User not found');
  }
  // Save refresh_token to null, clear cookies, and send the response
  user.refresh_token = null;
  user.save();
  res.clearCookie('refresh_token', { httpOnly: true });
  // res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).json({ message: 'Logut successfully' });
});

//@desc Refresh the access_token
//@route POST /api/auth/referesh
//@access public
const refresh = asyncHandler( async(req, res,) => {
  const cookies = req.cookies;
  // Check for refresh token
  if (!cookies.refresh_token) {
    res.status(204);
    throw new Error('Refresh token not valid.');
  }

  const refreshToken = cookies.refresh_token;
  const user = await User.findOne({ refresh_token: refreshToken });
  // Check if user exists
  if (!user) {
    res.status(403);
    throw new Error('User not found');
  }
  // Verify the refresh_token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error('User is not authorized');
      }
      // Create new access_token
      const accessToken = jwt.sign({
        user: {
          username: decoded.user.username,
          email: decoded.user.email,
          id: decoded.user.id,
        }
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

      res.status(201).json({ access_token: accessToken });
    },
  );
});

//@desc Get user data
//@route POST /api/auth/user
//@access private
const user = asyncHandler( async(req, res,) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = { register, login, logout, refresh, user };
