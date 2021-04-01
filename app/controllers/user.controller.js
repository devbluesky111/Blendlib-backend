const userModule = require("../models/user.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'User Module'`
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

  userModule.create(new userModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'user'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.update(new userModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'user'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'users'."));
};

exports.toggle_restrict = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.toggle_restrict(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'users'."));
};

exports.pending_solve = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.pending_solve(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'users'."));
};

exports.pending_membership = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.pending_membership(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'users'."));
};


exports.getAll = (req, res) => {
  userModule.getAll(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'user data'."));
};


exports.get_user_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.get_user_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'user data'."));
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  userModule.login(req, res);
};

exports.check_login = (req, res) => {
  // console.log('---cs--->', req.session.email);
  userModule.check_login(req, res);
};


exports.logout = (req, res) => {
  req.session.email = '';
  res.send({status: 'success'});
};



