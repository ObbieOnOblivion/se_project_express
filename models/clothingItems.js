const mongoose = require('mongoose');

const clothingItemsSchema = mongoose.Schema({
  name:{
    type: String,
    minlength: 2,
    maxlenth: 20,
    required: true
  },
  weather: {
    required: true,
    enum: ["hot", "warm", "cold"] // check for capitilization
  },
  imageUrl:{
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    _id: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt:{
    Date: Date.now()
  },

})

const cloths = mongoose.Model("Cloths", clothingItemsSchema)

module.exports = cloths;