const clothes = require('../models/clothingItems');

const errorHandler = require('../utils/error');

const getClothes = (req, res) => {
  clothes.find({})
    .then(items => res.status(200).send(items))
    .catch(error => errorHandler(error, res));
};

const addClothes = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  clothes.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then(newItem => res.status(201).send(newItem))
    .catch(error => errorHandler(error, res));
};

const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothes.findById(itemId)
    .orFail()
    .then(item => res.status(200).send(item))
    .catch(error => errorHandler(error, res));
};

const deleteClothingItem = async (req, res) => {
  const { itemId } = req.params;
  const item = await clothes.findById(itemId);

  if (item.owner.toString() === req.user._id.toString()) {
    clothes.findByIdAndDelete(itemId)
      .then(() => res.send(`${itemId}`))
      .catch(error => errorHandler(error, res));
  } else {
    errorHandler(new Error('Unauthorized'), res);
  }
};

const likeImage = (req, res) => {
  const { itemId } = req.params;

  clothes.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then(updatedClothes => res.status(200).send(updatedClothes))
    .catch(error => errorHandler(error, res));
};

const unlikeImage = (req, res) => {
  const { itemId } = req.params;

  clothes.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then(updatedClothes => res.status(200).send(updatedClothes))
    .catch(error => errorHandler(error, res));
};

module.exports = {
  getClothes,
  addClothes,
  getClothingItem,
  deleteClothingItem,
  likeImage,
  unlikeImage,
};
