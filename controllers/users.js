const user = require("../models/users");

const errorHandler = require("../utils/error")

const getUsers = (req, res) => {
  user.find({})
  .orFail()
  .then((users) => {
    res.status(200)
    res.send(users)
  }).catch((error) => { errorHandler(error, res) })
}

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  user.create({ "name": name, "avatar": avatar }).then((createdUser) => {
    res.status(201).send(createdUser);
  }
  ).catch((error) => { errorHandler(error, res) })
}

const getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId)
  .orFail()
  .then((item) => {
    res.status(200).send(item)
  }).catch((error) => { errorHandler(error, res) })
}

module.exports = { getUsers, createUser, getUser };