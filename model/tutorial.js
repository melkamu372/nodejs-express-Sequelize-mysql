module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("Tutorial", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Title should be required",
        }
      },
      unique: {
        msg: "Title must be unique",
      },
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "Description should be required",
        },
      },
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Tutorial;
};