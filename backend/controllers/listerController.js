const lister = require("../services/lister");

const listerController = {};

listerController.getSearchResults = async (req, res) => {
  try {
    const temp = await lister.getSearchResults(req.body.queryString);
    res.send(temp);
  } catch (err) {
    console.log("listerControl getSearchResults err: " + err);
    res.status(500).json({ message: err });
  }
};

listerController.getSections = async (req, res) => {
  console.log(req.body);
  try {
    const temp = await lister.getSections(
      req.body.subject_id,
      req.body.course_id
    );
    res.send(temp);
  } catch (err) {
    console.log("listerControl getSections err: " + err);
    res.status(500).json({ message: err });
  }
};

module.exports = listerController;
