const clothes = require('../models/clothingItems');
const errorHandler = require('../utils/errors');

const getClothes = async (req, res) => {
  try {
    const items = await clothes.find({});
    res.status(200).send(items);
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error); 
    }  }
};

const addClothes = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  try {
    const newItem = await clothes.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });
    res.status(201).send(newItem);
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error);
    }
  }
};

const getClothingItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await clothes.findById(itemId).orFail();
    res.status(200).send(item);
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error);
    }
  }
};

const deleteClothingItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await clothes.findById(itemId).orFail();

    if (item.owner.toString() === req.user._id.toString()) {
      await clothes.findByIdAndDelete(itemId);
      res.send({ itemId });
    } else {
      next(new errorHandler.ForbiddenError("Unauthorized Action"));
    }
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error);
    }
  }
};

const likeImage = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const updatedClothes = await clothes.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail();
    res.status(200).send(updatedClothes);
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error);
    }
  }
};

const unlikeImage = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const updatedClothes = await clothes.findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail();
    res.status(200).send(updatedClothes);
  } catch (error) {
    if (error.name === "CastError") {
      next(new errorHandler.BadRequestError("The id string is in an invalid format"));
    } else {
      next(error);
    }
  }
};

module.exports = {
  getClothes,
  addClothes,
  getClothingItem,
  deleteClothingItem,
  likeImage,
  unlikeImage,
};
