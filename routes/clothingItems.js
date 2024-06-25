const clothsRouter = require('express').Router();

clothsRouter.get('/items', (req, res)=>{
  res.send("grab the user model")
})

clothsRouter.post('/items', (req, res)=>{
  res.send("grab the user model")
})

clothsRouter.delete('/items', (req, res)=>{
  res.send("grab the user model")
})

module.exports = clothsRouter
