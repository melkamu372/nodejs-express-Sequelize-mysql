const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptons = {
	origin: "http://localhost:8080/"
		};
app.use (cors(corsOptons));

// parse requests of content-type - application/json

app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use (bodyParser.urlencoded({extended:true}));

// import the db
const db = require("./model/db.js");

db.sequelize.sync({force: false}).then(() => {
  console.log("Drop and resync db."); 
    });
    

//add route 

app.use("/api",require("./routes/tutorialRoutes.js"));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log (`Server is running on port ${PORT}.` );
});