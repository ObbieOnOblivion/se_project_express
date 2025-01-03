const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");
const errorHandler = require("../utils/error")

router.use(clothesRouter);
router.use(usersRouter);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
router.use((req, res) => {
  errorHandler(new Error("Route not found"), res)
})

module.exports = router;