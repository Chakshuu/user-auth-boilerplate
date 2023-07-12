const allowedOrigins = process.env.ALLOWED_ORIGINS;

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', true);
  }

  next();
}

module.exports = credentials;