const clothes = require('../models/clothingItems');

const errorHandler = require('../utils/error');

const getClothes = (req, res) => {
  clothes.find({}).then((items) => {
    res.status(200);
    res.send(items);
  }).catch((error) => { errorHandler(error, res) });
}

const addClothes = (req, res) => { // my req.user is no longer working is it because req.user is only set to one router
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  console.log("---------------------*------------------------")
  clothes.create({ "name": name, "weather": weather, "imageUrl": imageUrl, "owner": req.user._xid }).then((newItem) => {
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

const deleteClothingItem = async (req, res) => {
  const { itemId } = req.params;
  const checkUser = () =>{
    return clothes.findById(itemId)
    .then((item) => {
      if (item.owner == req.user._id){
        return true;
      }
      return new error("Unauthorized")
    })
  }
  if (checkUser()) {
    try {
      const response = await clothes.findByIdAndDelete(itemId).orFail();
      if (resposne){
        return res.status(200).send(response);
      }
      return new error("Response Failed")

    } catch (error) {
      errorHandler(error, res);
    }
  }
};

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