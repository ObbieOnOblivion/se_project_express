const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   const token = req.body['Authorization'].replace('Bearer ', '');
   if (!token) {
     return res.status(401).send({ error: 'Please authenticate.' });
   }

   jwt.verify(token, "Testing2024", (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: 'Invalid token.' });
      }
      req.user = decoded;
      next();
    });
    console.log("--------" * 3)
    console.log(req.user._id)
}

module.exports = {verifyToken}