const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      cors = require('cors');
require('dotenv/config')

const app = express();

app.use(express.json({ 'extended': false }));
app.use(cors());
app.use(bodyParser.json());

require('./models/Users');
require('./models/Courses');

mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
  () => console.log('Connected to db!')
);

require('./services/updater');

app.use(require('./routes'));

app.listen(process.env.PORT);