
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
const allowedOrigins = [
  'https://obbiesproject.ohbah.com',
  'https://www.obbiesproject.ohbah.com',

];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests from allowed origins or no origin (e.g., same-origin requests)
      callback(null, true);
    } else {
      // Reject requests from disallowed origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
