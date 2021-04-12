module.exports = app => {
    const coverModule = require("../controllers/cover.controller.js");

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'upload/');
        },
        filename: function (req, file, cb) {
        cb(null, `${file.originalname.split(' ').join('_')}`);
        }
    });

    var upload = multer({ storage: storage });
    
    app.post("/add_cover", coverModule.create);
    app.post("/edit_cover", coverModule.edit);
    app.post("/get_covers", coverModule.getAll);
    app.post("/get_cover_id", coverModule.get_cover_by_id);
    app.post("/delete_cover", coverModule.delete);
    app.post("/upload_cover", upload.single('file'), coverModule.upload);

}