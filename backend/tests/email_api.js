//////////////////////////
//// Imports
//////////////////////////

// import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//mailer
const mailer = require("../services/mailer.js")

//////////////////////////
//// Initialize server
//////////////////////////

// init the server
const app = express();

// middleware
app.use(cors())
app.use(bodyParser.json());

// begin
app.listen(3001, () => {
  console.log('App is running on port %d', 3001);
})


//////////////////////////
//// Routes
//////////////////////////

app.get('/', (req, res) => {
  res.json("It works!")
})

app.post('/notify', async (req, res) => {
  course_name = req.body.course_name
  lecture_name = req.body.lecture_name
  discussion_name = req.body.discussion_name
  prev_status = req.body.prev_status
  new_status = req.body.new_status
  email = req.body.email
  
  success = await mailer.notify(course_name, lecture_name, discussion_name, prev_status, new_status, email)

  res.send( success )
})

