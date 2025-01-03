
const jwt = require('jsonwebtoken');
const { handleErrors } = require('../utils/error'); // Adjust the import

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return handleErrors(new Error("Unauthorized"), res); // Call handleErrors
  }
  
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'Testing2024', (error, decoded) => {
    if (error) {
      return handleErrors(new Error("Unauthorized"), res); // Call handleErrors
    }
    
    req.user = decoded; 
    next();
  });
};

module.exports = { verifyToken };


