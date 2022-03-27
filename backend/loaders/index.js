//// Load config
require("dotenv/config");

//// Load database
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).catch(error => console.error(error));

//// Load models
require("../models/Users.js");
require("../models/Courses.js");

//// Load services
require("../services/LinkGenerator.js");
require("../services/Mailer.js");
require("../services/Registrar.js");
require("../services/Responder.js");
require("../services/Subscriber.js");
require("../services/Updater.js");

//// Load subscribers
require("../subscribers/Mailer.js");
require("../subscribers/Responder.js");

//// Load controllers
require("../controllers/Updater.js");
