const express = require('express');
const clothesRouter = express.Router();
const {getClothes, addCloths, getClothingItem, deleteClothingItem} = require('../controllers/clothingItems');


clothesRouter.get('/items', getClothes);

clothesRouter.get('/items/:itemId', getClothingItem)

clothesRouter.post('/items', addCloths);

clothesRouter.delete('/items/:itemId', deleteClothingItem);

module.exports = clothesRouter;
