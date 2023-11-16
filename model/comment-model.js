

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          notEmpty: {
            msg: "Text should be required",
          },
        },
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          notEmpty: {
            msg: "Text should be required",
          },
        },
      },
    });

    return Comment;
  };