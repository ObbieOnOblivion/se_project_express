const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlenth: 40,
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
    minlength: 5,
    maxlenth: 40,
    required: true,
    select: false
  },

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
  },

});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, compareFunction) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email'));
      }

      return compareFunction(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect password'));
          }
          return user;
        });
    });

}

userSchema.statics.changeUserCredentials = function changeUserCredentials(userId, name="", avatar=""){
  // can i use a validator on the name and avatar to follow the schema rules
  return this.findById(userId)
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Incorrect email'));
    } else{
      if (name.length >= 2){
        user.name = name;
      }
      if (avatar.length >= 2){
        user.avatar = avatar;
      }
      return user.save();
    }

  })
}

const user = mongoose.model("users", userSchema);

module.exports = user;