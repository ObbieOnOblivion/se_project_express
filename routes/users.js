const usersRouter = require('express').Router();

usersRouter.get('/users', (req, res)=>{
  res.send("grab the user model")
})

usersRouter.post('/users', (req, res)=>{
  res.send("grab the user model")
})

usersRouter.delete('/users', (req, res)=>{
  res.send("grab the user model")
})

module.exports = usersRouter;
