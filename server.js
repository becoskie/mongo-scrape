var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require("fs");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(logger("dev"));

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/layouts")
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

fs.readdirSync("./controllers").forEach(function (file) {
  if(file.substr(-3) == ".js") {
    route = require("./controllers/" + file);
    route.controller(app);
  }
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
