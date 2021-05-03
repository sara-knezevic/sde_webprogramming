const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
  {
      title: String,
      genre: String,
      year: Number
  },
  { timestamps: true }
);

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

var movies = mongoose.model('movie', schema);

module.exports = movies;
