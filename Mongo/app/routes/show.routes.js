module.exports = app => {
    const shows = require("../controllers/show.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Show
    router.post("/", shows.create);
  
    // Retrieve all Show
    router.get("/", shows.findAll);
  
    // Retrieve a single Show with id
    router.get("/:id", shows.findOne);
  
    // Update a Show with id
    router.put("/:id", shows.update);
  
    // Delete a Show with id
    router.delete("/:id", shows.delete);
  
    // Create a new Show
    router.delete("/", shows.deleteAll);
  
    app.use('/api/shows', router);
  };