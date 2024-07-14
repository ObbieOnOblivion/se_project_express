const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");
const errorHandler = require("../utils/error")

router.use(clothesRouter);
router.use(usersRouter);
router.use((req, res) => {
  errorHandler(new Error("Route not found"), res)
})

module.exports = router;