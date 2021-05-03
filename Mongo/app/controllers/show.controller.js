const db = require("../models");
const Show = require("../models/show.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Title can not be empty!" });
      return;
    } else if (!req.body.genre) {
      res.status(400).send({ message: "Genre can not be empty!" });
      return;
    }
  
    // Create a Show
    const show = new Show({
      title: req.body.title,
      genre: req.body.genre,
      seasons: req.body.seasons,
      active: req.body.active
    });
  
    // Save Show in the database
    show
      .save(show)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the show."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Show.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving the shows."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Show.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found show with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving show with id=" + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Show.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Show with id=${id}. Maybe Show was not found!`
            });
        } else res.send({ message: "Show was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Show with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Show.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Show with id=${id}. Maybe Show was not found!`
          });
        } else {
          res.send({
            message: "Show was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Show with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Show.deleteMany({})
    .then(data => {
        res.send({
        message: `${data.deletedCount} Show were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all shows."
        });
    });
};
