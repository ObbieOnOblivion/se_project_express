const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({ 
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 40,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid email',
    }
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
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
  },

});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, compareFunction) {

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Incorrect email'));
      }

      return compareFunction(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Incorrect password'));
          }
          return user;
        });
    });

}

userSchema.statics.changeUserCredentials = function changeUserCredentials(userId, name, avatar) {
  return this.findByIdAndUpdate(userId, { "name": name, "avatar": avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email'));
      }
      return user
    })
}

const user = mongoose.model("users", userSchema);

module.exports = user;