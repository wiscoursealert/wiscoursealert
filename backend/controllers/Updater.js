const config = require("../config");

const { setIntervalAsync } = require("set-interval-async/fixed");

const UpdaterService = require("../services/Updater");

// repeat every 10 seconds
setIntervalAsync(async () => {
  try{
    console.log("Fetching and responding...");
    let st = Date.now();
    await UpdaterService();
    console.log("Fetching and enqueing complete; time used = " + (Date.now()-st) + " ms; sleeping for " + config.fetchCooldown + " ms.");
  } catch (err) {
    console.error(err);
  }
}, config.fetchCooldown);
