const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { NotFoundError } = require("../utils/errors/index")

router.use(clothesRouter);
router.use(usersRouter);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
router.use((req,res,next) => {
  next(new NotFoundError("Not found"));
})

module.exports = router;