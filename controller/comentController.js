const db = require("../model/db");
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const log = require('node-file-logger');
// Create and Save a new Tutorial
exports.create = catchasyncHandler(async(req, res) => {
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };

  // Save Tutorial in the database
  const data = await Tutorial.create(tutorial);
  res.send(data);
}
);

// Retrieve all Tutorials from the database.
exports.findAll = catchasyncHandler(async(req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var data =await Tutorial.findAll({ where: condition });
    res.send(data);
    log.Info(`data featch on ${process.env.running_environment} server ...`)
});



// Find a single Tutorial with an id
exports.findOne = catchasyncHandler(async(req, res,next) => {
  const id = req.params.id;
  const data = await Tutorial.findByPk(id);
  if (!data) {
    log.Info(`Cannot find Tutorial with id=${id}.`);
     throw new AppError(`Cannot find Tutorial with id=${id}.`, 404);

  }
  res.send(data);
});

// Update a Tutorial by the id in the request
exports.update =catchasyncHandler(async (req, res) => {
  const id = req.params.id;
  const [num] = await Tutorial.update(req.body, { where: { id: id }, });
  if (num === 1) {
    log.Info(`Tutorial with id=${id} was updated successfully.`);
    res.send({message: "Tutorial was updated successfully.",});
  } 
  else {
    log.Info(`Cannot update Tutorial with id=${id}.`);
    throw new AppError(`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`, 404)
  }
});

// Delete a Tutorial with the specified id in the request
exports.delete =catchasyncHandler(async (req, res) => {
  const id = req.params.id;
  const num = await Tutorial.destroy({ where: { id: id } });
  if (num === 1) {
    res.send({
      message: "Tutorial was deleted successfully!",
    });
  } else {
    throw new AppError(`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`, 404);
  }
});

// Delete all Tutorials from the database.
exports.deleteAll =catchasyncHandler(async (req, res) => {
  const nums = await Tutorial.destroy({ where: {}, truncate: false });
  res.send({ message: `${nums} Tutorials were deleted successfully!` });
});

// find all published Tutorial
exports.findAllPublished =catchasyncHandler(async (req, res) => {
  const data = await Tutorial.findAll({ where: { published: true } });
  res.send(data);
});

