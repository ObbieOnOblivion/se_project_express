const express = require('express');

const { verifyToken } = require('../middlewares/auth');

const { createUser, getUser, login, updateProfile } = require('../controllers/users');

const {
    validateClothingItem,
    validateUserInfo,
    validateUserLogin,
    validateId,
    validateUserInfoToUpdate
  } = require('../middlewares/validation');

const usersRouter = express.Router();

usersRouter.post('/signup',validateUserInfo, createUser);

usersRouter.post('/signin',validateUserLogin, login);

usersRouter.get('/users/me', verifyToken, validateUserInfoToUpdate, getUser);

usersRouter.patch('/users/me', verifyToken, validateUserInfoToUpdate, updateProfile);

module.exports = usersRouter;
