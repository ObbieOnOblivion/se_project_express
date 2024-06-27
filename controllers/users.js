const user = require("../models/users");
const errorHandler = require("../utils/error")

const getUsers = (req, res) => {
  user.find({}).then((items) => {
    res.status(200)
    res.send(items)
  }).catch((error) => { errorHandler(error, res) })
}

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  user.create({ "name": name, "avatar": avatar }).then(() => {
    res.status(201)
    res.send(`${name}, and this is the link ${avatar}`)
  }
  ).catch((error) => { errorHandler(error, res) })
}

const getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId).then((user) => {
    res.status(200).send(user)
  }).catch((error) => { errorHandler(error, res) })
}

module.exports = { getUsers, createUser, getUser };