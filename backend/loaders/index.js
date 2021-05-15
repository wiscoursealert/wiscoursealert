//// Load config
require('dotenv/config')

//// Load database
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
  () => console.log('Connected to DB.')
);

//// Load models
require('../models/Users.js');
require('../models/Courses.js');

//// Load services
require('../services/linkGenerator.js')
require('../services/mailer.js')
require('../services/register.js')
require('../services/responder.js')
require('../services/subscriber.js')
require('../services/updater.js')

//// Load subscribers
require('../subscribers/mailer.js')
require('../subscribers/responder.js')