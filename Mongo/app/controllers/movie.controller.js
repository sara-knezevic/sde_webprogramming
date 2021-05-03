const db = require("../models");
const Movie = require("../models/movie.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Title can not be empty!" });
      return;
    } else if (!req.body.genre) {
      res.status(400).send({ message: "Genre can not be empty!" });
      return;
    }
  
    // Create a Movie
    const movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year
    });
  
    // Save Movie in the database
    movie
      .save(movie)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the movie."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Movie.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving the movies."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Movie.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found movie with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving movie with id=" + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
            });
        } else res.send({ message: "Movie was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Movie with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Movie.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
          });
        } else {
          res.send({
            message: "Movie was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Movie with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Movie.deleteMany({})
    .then(data => {
        res.send({
        message: `${data.deletedCount} Movie were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all movies."
        });
    });
};
