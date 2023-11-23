
    const tutorials = require("../controller/tutorialController.js");
    const {loginUser} = require("../controller/userController.js");
    const validateToken=require('../utils/validateTokenHandeler.js');
    var router = require("express").Router();
    
     // Creating a new Tutorial
     router.post("/login", loginUser);
    // Creating a new Tutorial
    router.post("/", tutorials.create);
    
    // Retrieving all the Tutorials
   // router.get("/", validateToken,tutorials.findAll);
     router.get("/",tutorials.findAll);

     router.get("/comment",tutorials.findAllWithComent);
    
    
    // Retrieving all the published Tutorials
    router.get("/published", tutorials.findAllPublished);
    
    // Retrieving a single Tutorial with id
    router.get("/:id", tutorials.findOne);
    
    // Updating a Tutorial with ID
    router.put("/:id", tutorials.update);
    router.put("/update/data",tutorials.updateFromBody);
   
    // Deleting a Tutorial with ID
    router.delete("/:id", tutorials.delete);
    
    // Creating a new Tutorial
    router.delete("/", tutorials.deleteAll);
    
    module.exports=router;