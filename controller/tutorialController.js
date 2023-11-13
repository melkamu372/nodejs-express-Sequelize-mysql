const db = require("../model");
// models path depends on your structure
const Tutorial = db.tutorials;

exports.create = (req, res) => {
// Validating the request
if (!req.body.title) {
res.status(400).send ({
message: "Content can be placed here!"
});
return;
}

// Creating a Tutorial
const Tutorial = {
title: req.body.title,
description: req.body.description,
published: req.body.published ? req.body.published : false
};

// Saving the Tutorial in the database
Tutorial.create(tutorial).then(data => {
res.send(data);
}) .catch(err => {
res.status(500).send ({
Message:
err.message || "Some errors will occur when creating a tutorial"
});
});
};