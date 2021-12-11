//// Load modules
require("./loaders");

//// Load express
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors");

//// Initialize app
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello There!");
});

app.use(require("./routes"));
