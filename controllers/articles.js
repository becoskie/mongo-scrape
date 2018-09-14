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

  app.get("/saved", function(req, res) {
    db.Article.find({ saved: { $in: true } })
    .populate("note")
    .then(function(data) {
      console.log(data);
      res.render("saved", {
        content: data
      });
    });
  });

  app.put("/save/:id", function(req, res) {
    db.Article.updateOne(
      { _id: req.params.id },
      { $set: { saved: true } },
      function(err, result) {
        if (err) {
          console.log(err);
        }
      }
    ).then(function(data) {
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

  app.put("/deleteSaved/:id", function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: false } },
      function(err, result) {
        if (err) {
          console.log(err);
        }
      }
    ).then(function(data) {
      res.render("saved", {
        content: data
      });
    });
  });

  app.post("/noteSaved/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    console.log(req.body)
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { note: dbNote._id } }, { new: true });
    })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        console.log(dbArticle)
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
 });
};



