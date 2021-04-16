module.exports = app => {
  const productModule = require("../controllers/product.controller.js");

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

  
  app.post("/get_products", productModule.getAll);
  app.post("/get_products_new", productModule.getNew);
  app.post("/get_products_menu", productModule.get_products_by_menu);
  app.post("/get_product_id", productModule.get_product_by_id);
  app.post("/add_product", productModule.create);
  app.post("/edit_product", productModule.edit);
  app.post("/delete_product", productModule.delete);
  app.post("/upload", upload.single('file'), productModule.upload);
  app.post("/get_count", productModule.getCount);
  
}
