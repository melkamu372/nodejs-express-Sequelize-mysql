module.exports = (sequelize, Sequelize) => {
  const Instructor = sequelize.define("Instructor", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Name should be required",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Email should be required",
        },
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Instructor;
};