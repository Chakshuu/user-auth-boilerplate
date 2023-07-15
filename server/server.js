const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const corsOptions = require('./config/cors');
const connectDb = require('./config/dbConnection');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;

// Connect DB
connectDb();

// CORS
app.use(cors(corsOptions));

// Allow Credentials
app.use(credentials);

// application/json response
app.use(express.json());

// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));

// app.all('*', (req, res) => {
//   res.status(404);
//   throw new Error('404 Not Found');
// });

// middleware for error handlers
app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
});
