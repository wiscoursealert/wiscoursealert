const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'user',      // placeholder
    password : 'pw',
    database : 'wisc-course-alert-test'
  }
});

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