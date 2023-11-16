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
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
    ,logging: console.log
  }
);

const db = {};

// Assign Sequelize and sequelize objects to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and invoke the tutorial model and pass in the sequelize and Sequelize objects
db.tutorials = require("../model/tutorial.js")(sequelize, Sequelize);
db.InsAddress = require("../model/instructor-address-model.js")(sequelize, Sequelize);
db.comments = require("../model/comment-model.js")(sequelize, Sequelize);
db.instructors = require("../model/instructor.js")(sequelize, Sequelize);
// Define associations
db.instructors.belongsTo(db.tutorials, { foreignKey: "instructorId" });
db.tutorials.hasOne(db.instructors, { foreignKey: "instructorId" });

db.comments.belongsTo(db.tutorials, { foreignKey: "tutorialId" });
db.tutorials.hasMany(db.comments, { foreignKey: "tutorialId" });

db.instructors.belongsTo(db.InsAddress, { foreignKey: "addressId" });
db.InsAddress.hasOne(db.instructors, { foreignKey: "addressId" });


// Sync the database to create or update the tables

// Export the db object
module.exports = db;