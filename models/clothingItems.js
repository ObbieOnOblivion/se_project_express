const mongoose = require('mongoose');
const validator = require('validator');

const clothingItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  weather: {
    type: String,
    required: [true, "Every item needs a weather category"],
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Clothes = mongoose.model("Clothes", clothingItemsSchema);

module.exports = Clothes;
