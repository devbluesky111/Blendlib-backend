module.exports = app => {
    const campaignModule = require("../controllers/campaign.controller.js");

    app.post("/add_campaign", campaignModule.create);
}