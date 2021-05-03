const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
  {
      title: String,
      genre: String,
      seasons: Number,
      active: Boolean
  },
  { timestamps: true }
);

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

var shows = mongoose.model('show', schema);

module.exports = shows;
