const Sequelize = require("sequelize");
const dbConfig = require("../configuration/db.config.js");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

// Assign Sequelize and sequelize objects to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and invoke the tutorial model and pass in the sequelize and Sequelize objects
db.tutorials = require("../model/tutorial.js")(sequelize, Sequelize);

// Export the db object
module.exports = db;