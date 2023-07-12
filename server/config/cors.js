const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

module.exports = corsOptions;
