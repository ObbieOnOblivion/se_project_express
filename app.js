const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/index');

const app = express();
const { PORT = 3001 } = process.env


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

app.use("/", Router);

app.listen(PORT);



