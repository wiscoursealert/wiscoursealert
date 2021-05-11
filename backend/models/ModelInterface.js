const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'user',      // placeholder
    password : 'pw',
    database : 'wisc-course-alert-test'
  }
});


exports.checkEmailExists = (email) => {
  db.query("SELECT*asdasdasdasd")
  return true

//updater
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

// responder
//getNotifyingUsers(list: changedCourses)
exports.getNotifyingUsers = ( changedCourses) => {
  return true
}


// call by Registrar
exports.checkEmailExists = (email) => {
  let exist = true
  await db.select('email').from('users').where({
    email: email
  }).returning('*')
  .then(emails => {
    if(emails.length){
      exist = true
    }
    else{
      exist = false
    }
  })
  .catch(err => {
    console.error(err)
  })
  return exist
}

// call by Registrar
exports.addNewUser = (email, user_id, delay) => {
  let result = true
  await db.transaction(trx => {
    trx.insert({
      email: email,
      user_id: user_id,
      delay: delay
    }).into('users')
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    result = false
    console.error(err)
  })

  return result
}

// call by Registrar
exports.checkUserIDExists = (user_id) => {
  let exist = true
  await db.select('user_id').from('users').where({
    user_id: user_id
  }).returning('*')
  .then(user_ids => {
    if(user_ids.length){
      exist = true
    }
    else{
      exist = false
    }
  })
  .catch(err => {
    console.error(err)
  })
  return exist
}

// call by Updater
exports.getUserData = (user_id) => {
  let result = true

  // get courses
  let courses = []
  let done1 = false
  db.select('course_id', 'sec_id').from('courses').where({
    user_id: user_id
  }).returning('*')
  .then((course_ids, sec_ids) => {
    let last_course_id = -1;
    for(let i = 0; i < course_ids.length; i++){
      // extract variables
      let course_id = course_ids[i]
      let sec_id = sec_ids[i]

      // check if this is a new course
      if(course_id != last_course_id){
        last_course_id = course_id
        // add blank section list
        courses.push({course_id: course_id, 
                      reserved_sections: []
                      })
      }
      // add section
      courses[courses.length-1].reserved_sections.push(sec_id)
    }
  })
  .catch(err => {
    result = false
    console.error(err)
  })
  .finally(() => {
    done1 = true
  })

  // get email and delay time
  let email = ''
  let delay = -1
  let done2 = false
  db.select('email', 'delay').from('users').where({
    user_id: user_id
  }).returning('*')
  .then(emails, delays => {
    email = emails[0]
    delay = delays[0]
  })
  .catch(err => {
    result = false
    console.error(err)
  })
  .finally(() => {
    done2 = true
  })

  // wait for both requests
  while(!done1 || !done2){}

  if(!result){
    return false
  }

  return {
    email: email,
    courses: courses,
    delay: delay
  }
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