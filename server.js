const express = require("express");
const exphbs = require('express-handlebars');
const path = require('path')
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

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

//Routes
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });