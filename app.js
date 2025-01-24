require('dotenv').config();

import { rateLimit } from 'express-rate-limit'

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
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// app.options('*', cors());
// app.use(cors(corsOptions));
// app.use(limiter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/", Router);
app.use(errorLogger);
// app.use(errors()); // does this even work 
// i want to have an error handler for everything not just the routers 
app.use(errorHandler);


app.listen(PORT);

