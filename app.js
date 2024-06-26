const mongoose = require('mongoose');
const app = require('./routes/index'); // even though we never call it this is nessecary for the app to to run index.js

// explain this to me all i did is run app.js(this file and for some reason its connecting index.js)
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db').then(
  () =>{
    console.log("db is working");
  }
).catch(
  console.error()
)



