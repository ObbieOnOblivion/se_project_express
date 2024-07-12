const express = require('express');

const { verifyToken } = require('../middlewares/auth');

const { createUser, getUser, login, updateProfile } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);

usersRouter.post('/signin', login)

usersRouter.get('/users/me', verifyToken, getUser);

usersRouter.patch('/users/me', verifyToken, updateProfile);

module.exports = usersRouter;
