module.exports = app => {
    const coverModule = require("../controllers/cover.controller.js");
    
    app.post("/add_cover", coverModule.create);
    app.post("/edit_cover", coverModule.edit);
    app.post("/get_all_covers", coverModule.getAll);
    app.post("/get_cover_id", coverModule.get_cover_by_id);
    app.post("/delete_cover", coverModule.delete);

}