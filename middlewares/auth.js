const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = require('../config'); // idea 2
const handleError = require('../utils/error');
const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'].replace('Bearer ', '');

   if (!token) {
     handleError(new Error("Unauthorized"))
   }

   jwt.verify(token, "Testing2024", (error, decoded) => {
      if (error) {
        handleError(new Error("Unauthorized"));
      }
      req.user = decoded;
      next();
    });
    console.log("--------" * 3)
    console.log(req.user._id)
}

module.exports = {verifyToken}