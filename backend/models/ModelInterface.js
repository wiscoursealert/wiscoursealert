// user_db
// course_db
// status_db


exports.checkEmailExists = (email) => {
  db.query("SELECT*asdasdasdasd")
  return true

//updateUserData(str: user_id, dict: user_data)
exports.updateUserData = (user_id, user_data) => {

  var success = true
  //delete all
  await db.select('*')
  .from('courses')
  .where({
    user_id: user_id
  })
  .del()

  /*courses: [
    {
        course_name: "COMP SCI 699",
        course_id: 69420,
        reserved_sections: ["001", "002"]
    }
  ]*/

  var i;  
  await db.transaction( update => {
    for(i=0; i<length(user_data.reserved_section); i++){
      update.insert({
        user_id: user_icd,
        courses_name: user_data.course_name,
        course_id: user_data.reserved_section[i]
      })
      .into("courses")
    }
    update.commit()
    .catch(update.rollback)
  })
  .catch(err => {
    success = false
  });
  
  return success
}

// responder
//getChangedCourses(list: course_status)
exports.getChangedCourses = (course_status) => {
  return true
}

//getNotifyingUsers(list: changedCourses)
exports.getNotifyingUsers = ( changedCourses) => {
  return true
}



    


/* template
// import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = 3001;
const saltRounds = 10;              // not sure what it is (n/a in the course), but for new bcrypt
const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'admin',
        database : 'smart-brain'
    }
});

// init the server
const app = express();

// middleware
app.use(cors())
app.use(bodyParser.json());

// begin
app.listen(PORT, () => {
    console.log('App is running on port %d', PORT);
})

app.post('/signin', (req, res) => {
    email = req.body.email.trim();
    password = req.body.password;
    db.select('*').from('login').where({
        email: email
    }).returning('*')
    .then(users => {
        if(users.length){
            user = users[0];                    // should have only one since email is unique
            if(bcrypt.compareSync(password, user.hash)){
                db.select('*').from('users').where({
                    email: email
                }).returning('*')
                .then(users => {
                    res.json(users[0])
                })
            }
            else{
                res.status(400).json('Sign-in failed: incorrect password');
            }
        }
        else{
            res.status(400).json('Sign-in failed: account does not exist');
        }
    })
    .catch(err => {
        console.log('===== Catched Error: =====');
        console.error(err);
        res.status(400).json('Sign-in failed: unknown error (please see the server\'s log)');
    });
})

app.post('/register', (req, res) => {
    userData = {
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        pwhash: bcrypt.hashSync(req.body.password, saltRounds),
        joined: new Date()
    }
    if(userData.name === '' || userData.email === '' || userData.password === ''){
        res.status(400).json('Registration failed: fields cannot be blank');
        return;
    }
    db.transaction(trx => {
        trx.insert({
            hash: userData.pwhash,
            email: userData.email
        }).into('login').returning('email')
        .then(loginEmail => {
            return trx('users').insert({            // must return for the latter thens
                email: loginEmail[0],
                name: userData.name,
                joined: new Date()          // other vars are defaulted by db
            }).returning('*')
            .then(user => {
                res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => {
        console.log('===== Catched Error: =====');
        console.error(err);
        res.status(400).json('Registration failed: unknown error (please see the server\'s log)');
    });
})

app.get('/profile/:userId', (req, res) => {
    id = req.params.userId;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(!user.length){           // no users found
            res.status(400).json('No user found');
        }
        if(user.length > 1){
            console.log('Warning: there are more than one user with matching ID')
        }
        res.json(user[0]);
    })
    .catch(err => {
        console.log('===== Catched Error: =====');
        console.error(err);
        res.status(400).json('Error getting user');
        return;
    });
})

app.put('/image', (req, res) => {
    id = req.body.id;
    db.select('*').from('users').where({
        id: id
    })
    .increment('entries', 1).returning('entries')
    .then(entries => {
        if(!entries.length){           // no users found
            res.status(400).json('No user found');
        }
        if(entries.length > 1){
            console.log('Warning: there are more than one user with matching ID')
        }
        res.json(entries[0]);
    })
    .catch(err => {
        console.log('===== Catched Error: =====');
        console.error(err);
        res.status(400).json('Error getting/updating user');
        return;
    });
})
*/