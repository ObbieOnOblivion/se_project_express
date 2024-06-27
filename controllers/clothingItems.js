const clothes = require('../models/clothingItems');

const errorHandler = require('../utils/error')

const getClothes = (req, res) => {
  clothes.find({}).then((items) => {
    res.status(200)
    res.send(items)
  }).catch((error) => { errorHandler(error, res) })
}

const addCloths = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  clothes.create({ "name": name, "weather": weather, "imageUrl": imageUrl, "owner": req.user }).then(() => {
    res.status(201)
    res.send(`<h1>${name}, use this clothing item in the ${weather} <h1>`)
  }
  ).catch((error) => { errorHandler(error, res) })

}

const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothes.findById(itemId).then((item) => {
    res.status(200).send(item)
  }).catch((error) => { errorHandler(error, res) })
}

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothes.findByIdAndDelete(itemId).then((response) => {
    res.status(200).send(response);
  }
  ).catch((error) => { errorHandler(error, res) })

}

const likeImage = (req, res) => {
  const { itemId } = req.params;

  clothes.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true, upsert: true }
  )
    .then((updatedClothes) => {
      if (!updatedClothes) {
        return res.status(404).send({ message: 'Item not found' });
      }

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
    { new: true, runValidators: true, upsert: true }
  )
    .then((updatedClothes) => {
      if (!updatedClothes) {
        return res.status(404).send({ message: 'Item not found' });
      }

      return res.status(200).send(updatedClothes);
    })
    .catch(error => {
      errorHandler(error, res)
    });
};

module.exports = { getClothes, addCloths, getClothingItem, deleteClothingItem, likeImage, unlikeImage };