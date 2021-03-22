const menuModule = require("../models/menu.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Menu Module'`
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

  menuModule.create(new menuModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'menu'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  menuModule.update(new menuModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'menu'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  menuModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'menu'."));
};

exports.getAll = (req, res) => {
  menuModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};


exports.getAll_o = (req, res) => {
  menuModule.getAll_o((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};



exports.createSubMenu = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  menuModule.createSubMenu(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'menu'."));
};

exports.editSubMenu = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  menuModule.updateSubMenu(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'menu'."));
};

exports.deleteSubMenu = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  menuModule.deleteSubMenu(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'menu'."));
};

exports.getAllSubMenu = (req, res) => {
  menuModule.getAllSubMenu((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};


exports.getAllSubMenu_o = (req, res) => {
  menuModule.getAllSubMenu_o((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};
