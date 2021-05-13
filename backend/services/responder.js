const courseModel = require('../models/Courses');
const userModel = require('../models/Users');
const lister = require('./lister');

// interface
manageResults = (results) => {
  try{
    manageResults_(results)
  }
  catch (err){
    console.log("Responder error:")
    console.error(err)
  }
}

manageResults_ = (results) => {
  let course_id = results[0].courseId
  let course_name = lister.getCourseName(course_id)
  
  // check each section in the result
  let secs_dict = {}
  for(let section in results){
    // find section id
    let sec_id = section.id

    // find enrollment status
    let status = null // TODO 

    // find lec/dis number
    let lec_num = null
    let dis_num = null
    for(let secprop in section.sections){
      // this has lecture
      if(secprop.type == "LEC"){
        lec_num = secprop.sectionNumber
      }
      // this has discussion
      else if(secprop.type == "DIS"){
        dis_num = secprop.sectionNumber
      }
    }

    // pack for later use
    secs_dict[sec_id] = {
      status: status,
      lec_num: lec_num,
      dis_num: dis_num
    }
  }

  // check each section in the database
  let course_data = courseModel.getCourse(course_id)
  for(let section_data in course_data.sections){
    // get section id
    let sec_id = section_data.section_id

    // locate new data of this section
    let section = secs_dict[sec_id]

    // update status
    section_data.prev_status = section_data.status 
    section_data.status = section.status

    // choose response if appropriate
    if((section_data.prev_status == "closed" && section_data.status == "waitlist") ||
       (section_data.prev_status == "closed" && section_data.status == "open") ||
       (section_data.prev_status == "waitlist" && section_data.status == "open")){
      let emails = section_data.subscriber_email
      // find each person
      for(let email in emails){
        let user = userModel.findEmail(email)
        let will_send = false
        // find the section info (for delay)
        for(user_course in user.subscribed){      // O(course subbed + sections subbed)
          if(user_course.course_id == course_id){
            for(user_section in user_course.sections){
              if(user_section.section_id == sec_id){
                last_sent = user_section.timestamp
                delay = user.delay
                if(null){     // TODO: check if last_sent and delay is proper
                  // TODO: set last_sent to now
                  will_send = true
                }
                break
              }
            }
            break
          }
        }
        if(will_send){
          // TODO: mail this person by emitting event
          // course_name, section.lec_num, section.dis_num, section_data.prev_status, section_data.status, email
          userModel.updateUser(user)
        }
        
      }
    }
  }
  // update database
  courseModel.updateCourse(course_data)
}

module.exports = manageResults