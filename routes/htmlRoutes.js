var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.project.findAll({}).then(function(data) {
      res.render("index", {
        message: "Hello World"
      });
    // });
  });

  // Load example page and pass in an example by id
//   app.get("/project/:id", function(req, res) {
//     db.project
//       .findOne({ where: { project_id: req.params.id } })
//       .then(function(data) {
//         res.render("project", {
//           project: data
//         });
//       });
//   });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
