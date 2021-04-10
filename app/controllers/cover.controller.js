const coverModule = require("../models/cover.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Cover Module'`
      });
    } else {
      res.status(500).send({
        message:
          defaultErrMessage || err.message || "Internal server error"
      });
    }
  } else {
    res.send(data);
  }
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  coverModule.create(new coverModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'cover'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  coverModule.update(new coverModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'cover'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  coverModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'covers'."));
};

exports.getAll = (req, res) => {
  coverModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'cover data'."));
};


exports.get_cover_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  coverModule.get_cover_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'cover data'."));
};

exports.upload = (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var move = require('fs-move');
  var mkdirp = require('mkdirp');
  var today = Date.now();

  mkdirp(req.file.destination + 'coverimages/' + today).then(made =>
    move(req.file.destination + req.file.filename, req.file.destination + 'coverimages/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
  );

  coverModule.upload(req.body, today, req.file.filename, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};
