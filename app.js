const mongoose = require('mongoose');
const fs = require('fs/promises');
const express = require('express');
const mainRouter = require('./routes');
const validator = require('validator');

const app = express()
app.use("/", mainRouter);

app.listen(3000, () => {
  console.log("well at least we got this going");
});

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

mongoose.Model("testDB", userSchema);



