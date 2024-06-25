const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenth: 20,
    required: true
  },

  avatar: {
    type: String,
    minlength: 2,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  }
});

const user = mongoose.Model("users", userSchema)

module.exports = user;