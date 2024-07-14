
const jwt = require('jsonwebtoken');

const errorHandler = require('../utils/error');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    errorHandler(new Error("Unauthorized"), res)
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'Testing2024', (error, decoded) => {
    if (error) {
      errorHandler(new Error("Unauthorized"), res);
    }
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken }




