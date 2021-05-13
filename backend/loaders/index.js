//////////////////////////
//// Define loaders
//////////////////////////

// init database
dbLoader = () => {
  // trigger database's initialization
  require('../models/ModelInterface.js')
  return true
}


//////////////////////////
//// Run loaders
//////////////////////////

if(dbLoader()){
  console.log("Loader: Database initialized")
}


