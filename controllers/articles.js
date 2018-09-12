var db = require("../models");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
module.exports.controller = function(app) {
  app.get("/scrape", (req, res) => {
    request("https://www.theverge.com/", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $(".c-entry-box--compact__body h2").each(function(i, element) {
          // Save an empty result object
          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
          result.saved = false;
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
        content: data
      });
    });
  });

  app.put("/save/:id", function(req, res) {
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true }}, function(
      err,
      result
    ) {
      if (err) {
        console.log(err);
      }
    }).then(function(data) {
      res.render("index", {
        content: data
      });
    });
  });

  app.get("/clear", function(req, res) {
    db.Article.remove().then(function(data) {
      res.render("index", {
        content: data
      });
    });
  });
};
