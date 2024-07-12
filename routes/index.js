const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");

router.use(clothesRouter);
router.use(usersRouter);
router.use((req,res) =>{
  res.status(404).send("<h1> Besnon: Get to work or your fired!!!</h1>")
})

module.exports = router;