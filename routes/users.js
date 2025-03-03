const express = require('express');

const { verifyToken } = require('../middlewares/auth');

const { createUser, getUser, login, updateProfile } = require('../controllers/users');

const {
    validateUserInfo,
    validateUserLogin,
    validateUserInfoToUpdate
  } = require('../middlewares/validation');

const usersRouter = express.Router();

usersRouter.post('/signup',validateUserInfo, createUser);

usersRouter.post('/signin',validateUserLogin, login);

usersRouter.get('/users/me', verifyToken, getUser);

usersRouter.patch('/users/me', verifyToken, validateUserInfoToUpdate, updateProfile);

module.exports = usersRouter;
