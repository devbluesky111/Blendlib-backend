const productModule = require("../models/product.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Product Module'`
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

  productModule.create(new productModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'product'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  productModule.update(new productModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'product'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  productModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'product'."));
};

exports.getAll = (req, res) => {
  productModule.getAll(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'products'."));
};

exports.getNew = (req, res) => {
  productModule.getNew(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'newly added products'."));
};

exports.get_products_by_menu = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  productModule.get_products_by_menu(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};

exports.get_product_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  productModule.get_product_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
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

  if(req.body.name === 'p_image' || req.body.name === 'featured_images') {
    mkdirp(req.file.destination + 'images/' + today).then(made =>
      move(req.file.destination + req.file.filename, req.file.destination + 'images/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
    ); 
  } else {
    mkdirp(req.file.destination + 'blends/' + today).then(made =>
      move(req.file.destination + req.file.filename, req.file.destination + 'blends/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
    );
  }

  productModule.upload(req.body, today, req.file.filename, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};

exports.getCount = (req, res) => {
  productModule.getCount(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'products'."));
};