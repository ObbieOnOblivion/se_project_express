const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const user = require("../models/users");

const errorHandler = require("../utils/error");

const createUser = async (req, res) => {
  const { email, password, name, avatar } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return errorHandler(new Error('Email already in use'), res);
    }

    const hash = await bcrypt.hash(password, 12);
    const createdUser = await user.create({ email, password: hash, name, avatar });

    const userObject = createdUser.toObject();
    delete userObject.password;

    return res.status(201).send(userObject);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getUser = async (req, res) => {
  try {
    const indivisual = await user.findById(req.user._id).orFail();
    return res.status(200).send(indivisual);
  } catch (error) {
    return errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const response = await user.findUserByCredentials(req.body.email, req.body.password, bcrypt.compare);
    if (response) {
      const token = jwt.sign({ _id: response._id }, 'Testing2024', { expiresIn: "7d" });
      return res.status(200).send({ token });
    }
    return res.status(401).send({ message: 'Authentication failed' }); // needs to be fixed
  } catch (error) {
    return errorHandler(error, res);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await user.changeUserCredentials(req.user._id, name, avatar);
    return res.status(200).send(updatedUser);
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = { createUser, getUser, login, updateProfile };
