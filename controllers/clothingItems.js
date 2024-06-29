const clothes = require('../models/clothingItems');

const errorHandler = require('../utils/error');

const getClothes = (req, res) => {
  clothes.find({}).then((items) => {
    res.status(200);
    res.send(items);
  }).catch((error) => { errorHandler(error, res) });
}

const addClothes = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  clothes.create({ "name": name, "weather": weather, "imageUrl": imageUrl, "owner": req.user }).then((newItem) => {
    res.status(201);
    res.send(newItem);
  }
  ).catch((error) => { errorHandler(error, res) });

}

const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothes.findById(itemId)
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    }).catch((error) => { errorHandler(error, res) });
}

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothes.findByIdAndDelete(itemId)
    .orFail()
    .then((response) => {
      res.status(200).send(response);
    }
    ).catch((error) => { errorHandler(error, res) });

}

const likeImage = (req, res) => {
  const { itemId } = req.params;

  clothes.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true})
    .orFail()
    .then((updatedClothes) => {
      return res.status(200).send(updatedClothes);
    })
    .catch(error => {
      errorHandler(error, res)
    });
};

const unlikeImage = (req, res) => {
  const { itemId } = req.params;

  clothes.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true})
    .orFail()
    .then((updatedClothes) => {
      return res.status(200).send(updatedClothes);
    })
    .catch(error => {
      errorHandler(error, res);
    });
};

module.exports = { getClothes, addClothes, getClothingItem, deleteClothingItem, likeImage, unlikeImage };