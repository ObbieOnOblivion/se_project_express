const express = require('express');

const clothesRouter = express.Router();

const { getClothes, addClothes, getClothingItem, deleteClothingItem, likeImage, unlikeImage } =
  require('../controllers/clothingItems');

const {
  validateClothingItem,
  validateUserInfo,
  validateUserLogin,
  validateId,
} = require('../middlewares/validation');


const { verifyToken } = require('../middlewares/auth');

clothesRouter.get('/items', getClothes);

clothesRouter.get('/items/:itemId', verifyToken, getClothingItem);

clothesRouter.post('/items', validateClothingItem, verifyToken, addClothes);

clothesRouter.put('/items/:itemId/likes', verifyToken, likeImage);

clothesRouter.delete('/items/:itemId/likes', verifyToken, unlikeImage);

clothesRouter.delete('/items/:itemId', verifyToken, deleteClothingItem);

module.exports = clothesRouter;
