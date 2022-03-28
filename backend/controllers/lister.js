const listerService = require('../services/lister');

const getSearchResults = async (req, res) => {
  try {
    const temp = await listerService.getSearchResults(req.body.queryString);
    res.send(temp);
  } catch (err) {
    console.err(err);
    res.status(500);
  }
};

const getSections = async (req, res) => {
  try {
    const temp = await listerService.getSections(
      req.body.subject_id,
      req.body.course_id
    );
    res.send(temp);
  } catch (err) {
    console.err(err);
    res.status(500);
  }
};

module.exports = {
  getSearchResults, 
  getSections
};
