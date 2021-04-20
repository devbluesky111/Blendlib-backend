module.exports = app => {
    const subscribeModule = require("../controllers/subscribe.controller.js");

    app.post("/subscribe", subscribeModule.subscribe);
}