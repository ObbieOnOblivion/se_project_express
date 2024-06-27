const mongoose = require('mongoose');
const app = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db').then(
  () => {
    console.log("db is working");
  }
).catch(
  console.error()
)



