require('dotenv').config();

const {rateLimit} = require('express-rate-limit');

const express = require('express');

const {errorHandler} = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { celebrate, Joi, errors } = require('celebrate');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require("cors");

const Router = require('./routes/index');

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
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

app.options('*', cors());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://obbiesproject.ohbah.com',
    'https://www.obbiesproject.ohbah.com',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  } 
  next();
});
app.use(limiter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/", Router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);


app.listen(PORT);

