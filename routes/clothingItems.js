const express = require('express');

const clothesRouter = express.Router();

const { getClothes, addClothes, getClothingItem, deleteClothingItem, likeImage, unlikeImage } =
  require('../controllers/clothingItems');

const {
  validateClothingItem,
  validateUserInfo,
  validateUserLogin,
  validateItemIdInHeaders
} = require('../middlewares/validation');


const { verifyToken } = require('../middlewares/auth');

clothesRouter.get('/items', getClothes);

clothesRouter.get('/items/:itemId', verifyToken, getClothingItem);

clothesRouter.post('/items', verifyToken, validateClothingItem, addClothes);

clothesRouter.put('/items/:itemId/likes', validateItemIdInHeaders, verifyToken, likeImage);

clothesRouter.delete('/items/:itemId/likes', validateItemIdInHeaders, verifyToken, unlikeImage);

clothesRouter.delete('/items/:itemId', validateItemIdInHeaders, verifyToken, deleteClothingItem);

module.exports = clothesRouter;
