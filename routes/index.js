const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");
const {handleErrors, InternalServerError} = require("../utils/errors/index")

router.use(clothesRouter);
router.use(usersRouter);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
router.use((req, res) => {
  handleErrors(new InternalServerError, res)
})

module.exports = router;