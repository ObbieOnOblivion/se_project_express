const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const user = require("../models/users");

const errorHandler = require("../utils/error");

//find by id function

const getUsers = (req, res) => {
  user.find({})
    .orFail()
    .then((users) => {
      res.status(200)
      res.send(users)
    }).catch((error) => { errorHandler(error, res) })
}

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;
  bcrypt.hash(password, 12).then(hash => {
    user.create({ email: email, password: hash, "name": name, "avatar": avatar }).then((createdUser) => {
      res.status(201).send(createdUser);
    }
    ).catch((error) => { errorHandler(error, res) })
  })
}

const getUser = (req, res) => {
  user.findById(req.user._id)
    .orFail()
    .then((item) => {
      res.status(200).send(item)
    }).catch((error) => { errorHandler(error, res) })
}

const login = async (req, res) => {
  try {
    const response = await user.findUserByCredentials(req.body.email, req.body.password, bcrypt.compare);
    if (response) {
      const token = jwt.sign({ _id: response._id }, "Testing2024", {
        expiresIn: "7d",
      });
      res.status(200).send({ "token": token });
    }

  } catch (error) {
    errorHandler(error, res);
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await user.changeUserCredentials(req.user._id, name, avatar);
    res.status(200).send(updatedUser);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { getUsers, createUser, getUser, login, updateProfile };
