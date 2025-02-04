
const jwt = require('jsonwebtoken');
const handleErrors = require('../utils/errors');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new handleErrors.UnauthorizedError("User not Authorized"));
  }
  
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'Testing2024', (error, decoded) => {
    if (error) {
      next(new handleErrors.UnauthorizedError("User not Authorized"));
    }
    
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };


