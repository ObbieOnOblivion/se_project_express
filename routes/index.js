const express = require('express');
const usersRouter = require("./users");
const clothesRouter = require("./clothingItems");
const app = express();

const { PORT = 3001 } = process.env

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '667c359e53552147484e8423'
  };
  next();
});
app.use(clothesRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
