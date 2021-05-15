const lister = require("../services/lister")

const listerController = {};

listerController.getSearchResults = (req) => {
    try{
        lister.getSearchResults(req)
    }
    catch{
        console.log("....")
        res.status(500).json({ message: err });
    }

}

module.exports = listerController;