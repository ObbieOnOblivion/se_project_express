const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({ // what id i want to not use the new keyword
  name: {
    type: String,
    minlength: 2,
    maxlenth: 20,
    required: true
  },

  avatar: {
    type: String,
    minlength: 2,
    required: [true, 'this is a required field'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  }
});

const user = mongoose.model("users", userSchema)

module.exports = user;