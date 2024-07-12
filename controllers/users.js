const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const user = require("../models/users");

const errorHandler = require("../utils/error");

const createUser = async (req, res) => {
  const { email, password, name, avatar } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 12);
    const createdUser = await user.create({ email, password: hash, name, avatar });
    res.status(201).send(createdUser);
  } catch (error) {
    errorHandler(error, res);
  }
  return null
};

const getUser = (req, res) => {
  user.findById(req.user._id)
    .orFail()
    .then(item => res.status(200).send(item))
    .catch(error => errorHandler(error, res));
    return null
};

const login = async (req, res) => {
  try {
    const response = await user.findUserByCredentials(req.body.email, req.body.password, bcrypt.compare);
    if (response) {
      const token = jwt.sign({ _id: response._id }, "Testing2024", { expiresIn: "7d" });
      return res.status(200).send({ token });
    }
    return res.status(401).send({ message: 'Authentication failed' });
  } catch (error) {
    errorHandler(error, res);
  }
  return null
};

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await user.changeUserCredentials(req.user._id, name, avatar);
    res.status(200).send(updatedUser);
  } catch (error) {
    errorHandler(error, res);
  }
  return null
};

module.exports = { createUser, getUser, login, updateProfile };
