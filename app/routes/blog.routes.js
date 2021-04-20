module.exports = app => {
    const blogModule = require("../controllers/blog.controller.js");

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
    
    app.post("/add_blog", blogModule.create);
    app.post("/edit_blog", blogModule.edit);
    app.post("/get_blogs", blogModule.getAll);
    app.post("/get_blog_id", blogModule.get_blog_by_id);
    app.post("/delete_blog", blogModule.delete);
    app.post("/upload_blog", upload.single('file'), blogModule.upload);

}