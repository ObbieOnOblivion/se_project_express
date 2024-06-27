const express = require('express');
const { getUsers, createUser, getUser } = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/users', getUsers); // error handling for when requests time out

usersRouter.get('/users/:userId', getUser);

usersRouter.post('/users', createUser);

usersRouter.delete('/users/:userId', (req, res) => {
  if (req.body) {
    res.send("grab the user model");
  }
});

module.exports = usersRouter;
