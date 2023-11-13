require('dotenv').config();
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
const AppError = require("./utils/appError.js");
const controllerMiddleWare = require('./utils/controllerMiddleWare.js');

db.sequelize.sync({force: false}).then(() => {
  console.log("Drop and resync db."); 
    });
    
//add route 

app.use("/api",require("./routes/tutorialRoutes.js"));
app.all('*',(req,res,next)=>{
  const err=new AppError(`Can't find the ${req.originalUrl} on the Server!`,404);
   next(err);
})

app.use(controllerMiddleWare);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
console.log (`Server is running on port ${PORT}.` );
});