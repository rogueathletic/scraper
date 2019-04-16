var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    return scrape()
      .then(function(articles) {
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "Awe, bummer you have read everything already"
          });
        }
        else {
          res.json({
            message: "updated " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "All done."
        });
      });
  }
};
