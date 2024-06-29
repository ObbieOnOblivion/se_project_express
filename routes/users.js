const express = require('express');
const { getUsers, createUser, getUser } = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/users', getUsers); // error handling for when requests time out

usersRouter.get('/users/:userId', getUser);

usersRouter.post('/users', createUser);

module.exports = usersRouter;
