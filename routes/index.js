const router = require("express").Router();
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");

// router.use((req, res, next) => {
//   req.user = {
//     _id: '667c359e53552147484e8423'
//   };
//   next();
// });

router.use(clothesRouter);
router.use(usersRouter);

module.exports = router;
