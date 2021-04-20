const subscribeModule = require("../models/subscribe.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Subscribe Module'`
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

exports.subscribe = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    subscribeModule.subscribe(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'subscribe'."));
}

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  subscribeModule.create(new subscribeModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'subscribe'."));
};