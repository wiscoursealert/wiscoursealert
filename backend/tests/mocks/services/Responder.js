const resultsList = [];
let running = false;
const delay = 1000;

wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

const service = async (results, Mailer=null) => {
  running = true;
  await wait(delay);
  resultsList.push(results);
  running = false;
}

module.exports = {service: service, resultsList: resultsList, delay: delay, running: running};
