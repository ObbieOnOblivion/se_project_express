const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require("../models/users");
const errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  const { email, password, name, avatar } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return next(new errors.ConflictError("Email already in use"));
    }

    const hash = await bcrypt.hash(password, 12);
    const createdUser = await user.create({ email, password: hash, name, avatar });

    const userObject = createdUser.toObject();
    delete userObject.password;

    return res.status(201).send(userObject);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new errors.ForbiddenError("The id string is in an invalid format"));
    }
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const individual = await user.findById(req.user._id).orFail();
    return res.status(200).send(individual);
  } catch (error) {
    if (error.name === "DocumentNotFoundError") {
      return next(new errors.NotFoundError("The id string is in an invalid format"));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const response = await user.findUserByCredentials(req.body.email, req.body.password, bcrypt.compare);
    if (!response) {
      return next(new errors.UnauthorizedError("Invalid Credentials"));
    }

    const token = jwt.sign({ _id: response._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).send({ token });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new errors.BadRequestError("The id string is in an invalid format"));
    }
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await user.changeUserCredentials(req.user._id, name, avatar);
    return res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new errors.BadRequestError("Invalid data"));
    }
    return next(error);
  }
};

module.exports = { createUser, getUser, login, updateProfile };
