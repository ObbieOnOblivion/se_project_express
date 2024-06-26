const express = require('express');

const clothesRouter = express.Router();

const { getClothes, addClothes, getClothingItem, deleteClothingItem, likeImage, unlikeImage } =
  require('../controllers/clothingItems');

clothesRouter.get('/items', getClothes);

clothesRouter.get('/items/:itemId', getClothingItem);

clothesRouter.post('/items', addClothes);

clothesRouter.put('/items/:itemId/likes', likeImage);

clothesRouter.delete('/items/:itemId/likes', unlikeImage);

clothesRouter.delete('/items/:itemId', deleteClothingItem);

module.exports = clothesRouter;
