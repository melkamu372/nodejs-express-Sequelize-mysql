module.express = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("Tutorial", {
    title: {
    type: Sequelize.STRING
    },
    description: {
    type: Sequelize.STRING
    },
    published: {
    type: Sequelize.BOOLEAN
    }
    });
    return Tutorial;
    };