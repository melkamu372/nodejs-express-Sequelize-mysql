module.exports = (sequelize, Sequelize) => {
    const Instructor_Address = sequelize.define("InsAddress", {
      country: {
        type: Sequelize.STRING,
        },
        
      Town: {
            type: Sequelize.STRING,
            },
      
    });
  
    return Instructor_Address;
  };