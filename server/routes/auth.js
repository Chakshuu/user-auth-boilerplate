const express = require('express');
const {
  register,
  login,
  logout,
  refresh,
  user
} = require('../controllers/authController');
const authentication = require('../middleware/authentication');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refresh);

router.get('/user', authentication, user);

module.exports = router;
