const blogModule = require("../models/blog.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Blog Module'`
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
  blogModule.create(new blogModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'blog'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  blogModule.update(new blogModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'blog'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  blogModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'blogs'."));
};

exports.getAll = (req, res) => {
  blogModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'blog data'."));
};


exports.get_blog_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  blogModule.get_blog_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'blog data'."));
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

  mkdirp(req.file.destination + 'blogs/' + today).then(made =>
    move(req.file.destination + req.file.filename, req.file.destination + 'blogs/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
  );

  blogModule.upload(req.body, today, req.file.filename, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};
