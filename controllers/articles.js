var db = require("../models");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
module.exports.controller = function(app) {
  app.get("/scrape", (req, res) => {
    request("https://adtmag.com/pages/topic-pages/web-dev.aspx", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $("#ph_pcontent2_0_divListBox h3").each(function(i, element) {
          // Save an empty result object
          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        });
        res.send("Scrape Complete");
      }
    });
  });

  app.get("/", function(req, res) {
    db.Article.find({}).then(function(data) {
      res.render("index", {
        project: data
      });
    });
  });
};
