const express = require('express');

const clothesRouter = express.Router();

const { getClothes, addClothes, getClothingItem, deleteClothingItem, likeImage, unlikeImage } =
  require('../controllers/clothingItems');

const {
  validateClothingItem,
  validateUserInfo,
  validateUserLogin,
  validateItemIdInParams
} = require('../middlewares/validation');


const { verifyToken } = require('../middlewares/auth');

clothesRouter.get('/items', getClothes);

clothesRouter.get('/items/:itemId', verifyToken, getClothingItem);

clothesRouter.post('/items', verifyToken, validateClothingItem, addClothes);

clothesRouter.put('/items/:itemId/likes', validateItemIdInParams, verifyToken, likeImage);

clothesRouter.delete('/items/:itemId/likes', validateItemIdInParams, verifyToken, unlikeImage);

clothesRouter.delete('/items/:itemId', validateItemIdInParams, verifyToken, deleteClothingItem);

module.exports = clothesRouter;
