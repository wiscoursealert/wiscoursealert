const config = require("../config");
const { setIntervalAsync } = require("set-interval-async/fixed");

const updaterService = require("../services/updater");

// repeat every config.fetchCooldown/1000 seconds (default to 10)
setIntervalAsync(async () => {
  try{
    //console.log("Fetching and responding...");
    let st = Date.now();
    try{
      await updaterService();
    } catch (e){
      console.error(e);
      // must not throw
    }
    console.log("Fetching and enqueing complete; time used = " + (Date.now()-st) + " ms; sleeping for " + config.fetchCooldown + " ms.");
  } catch (err) {
    console.error(err);
  }
}, config.fetchCooldown);
