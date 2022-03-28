const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(
	config.mongoDb.uri,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).catch(error => console.error(error));

//// Load repositories
require("../repositories/users.js");
require("../repositories/courses.js");

//// Load services
require("../services/linkGenerator.js");
require("../services/mailer.js");
require("../services/registrar.js");
require("../services/responder.js");
require("../services/subscriber.js");
require("../services/updater.js");

//// Load subscribers
require("../subscribers/mailer.js");
require("../subscribers/responder.js");

//// Load schedulers
require("../schedulers/updater.js");
