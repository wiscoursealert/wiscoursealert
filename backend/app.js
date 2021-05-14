//// Load express
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

      
//// Load config
require('dotenv/config')


//// Load database
const mongoose = require('mongoose');
require('./models/Users');
require('./models/Courses');

mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
  () => console.log('Connected to DB.')
);


//// Load other services
require('./services/updater');


//// Initialize app
const app = express();

app.use(express.json({ 'extended': false }));
app.use(cors());
app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(process.env.PORT);