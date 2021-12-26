const resultsList = [];

const service = (results, Mailer=null) => {
  resultsList.push(results);
}

module.exports = {service: service, resultsList: resultsList};
