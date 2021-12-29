const ListerService = require("../services/Lister");

const Lister = {};

Lister.getSearchResults = async (req, res) => {
  try {
    const temp = await ListerService.getSearchResults(req.body.queryString);
    res.send(temp);
  } catch (err) {
    console.log("listerControl getSearchResults err: " + err);
    res.status(500).json({ message: err });
  }
};

Lister.getSections = async (req, res) => {
  try {
    const temp = await ListerService.getSections(
      req.body.subject_id,
      req.body.course_id
    );
    res.send(temp);
  } catch (err) {
    console.log("listerControl getSections err: " + err);
    res.status(500).json({ message: err });
  }
};

module.exports = Lister;
