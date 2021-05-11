// import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;
const model = require('../models/ModelInterface.js');

// init the server
const app = express();

// middleware
app.use(cors())
app.use(bodyParser.json());

// begin
app.listen(PORT, () => {
  console.log('App is running on port %d', PORT);
})

app.get('/', (req, res) => {
  res.json("It works!")
})

app.post('/checkEmailExists', async (req, res) => {
  console.log(req.body)
  email = req.body.email.trim();
  result = await model.checkEmailExists(email)
  if(result == null){
    res.status(400)
  }
  res.json(result)
})

app.post('/addNewUser', async (req, res) => {
  email = req.body.email.trim();
  user_id = req.body.user_id.trim();
  delay = req.body.delay;
  result = await model.addNewUser(email, user_id, delay)
  if(result == null || result == false){
    res.status(400)
  }
  res.json(result)
})

app.post('/checkUserIDExists', async (req, res) => {
  user_id = req.body.user_id.trim();
  result = await model.checkUserIDExists(user_id)
  if(result == null){
    res.status(400)
  }
  res.json(result)
})

app.post('/getUserData', async (req, res) => {
  user_id = req.body.user_id.trim();
  result = await model.getUserData(user_id)
  if(result == null || result == false){
    res.status(400)
  }
  res.json(result)
})