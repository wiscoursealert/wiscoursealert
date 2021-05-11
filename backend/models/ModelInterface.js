const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'user',      // placeholder
    password : 'pw',
    database : 'wisc-course-alert-test'
  }
});

// Registrar
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

// Updater
exports.getUserData = (user_id) => {
  let result = true

  // get courses
  let courses = []
  //let done1 = false
  await db.select(['course_id', 'sec_id']).from('courses').where({
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
  /*
  .finally(() => {
    done1 = true
  })
  */

  // get email and delay time
  let email = ''
  let delay = -1
  //let done2 = false
  await db.select(['email', 'delay']).from('users').where({
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
  /*
  .finally(() => {
    done2 = true
  })
  */

  // wait for both requests
  //while(!done1 || !done2){}       // Q: are we able to do this without using await on each?

  if(!result){
    return false
  }

  return {
    email: email,
    courses: courses,
    delay: delay
  }
}

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



