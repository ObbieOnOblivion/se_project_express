
const express = require('express');

const {errorHandler} = require('./middlewares/errorHandler');//this 

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { celebrate, Joi, errors } = require('celebrate');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require("cors");

const Router = require('./routes/index');

require('dotenv').config();

const app = express();

const { PORT = 3001 } = process.env


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

const corsOptions = {
    origin: 'https://obbiesproject.ohbah.com', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };

app.options('*', cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/", Router);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);


app.listen(PORT);

//make sure to connect pm2
