const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movies = require("./movie.model.js")(mongoose);
db.shows = require("./show.model.js")(mongoose);

module.exports = db;
