const sql = require("./db.js");

// constructor
const productModule = function(productGroup) {
  this.id = productGroup.id;
  this.name = productGroup.name;
  this.short_description = productGroup.short_description;
  this.long_description = productGroup.long_description;
  this.main_menu = productGroup.main_menu;
  this.sub_menu = productGroup.sub_menu;
  this.free_v = productGroup.free_v;
  this.pro_v = productGroup.pro_v;
  this.local_v = productGroup.local_v;
  this.p_image = productGroup.p_image;
  this.featured_images = productGroup.featured_images.join('|');
  this.free_blend = productGroup.free_blend;
  this.pro_blend = productGroup.pro_blend;
  this.local_blend = productGroup.local_blend;
};

productModule.create = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO product SET name = ?, short_description = ?, long_description=?, main_menu=?, sub_menu=?, free_v=?, pro_v=?, local_v=?, p_image=?, featured_images=?, free_blend=?, pro_blend=?, local_blend=?, created = NOW()", 
      [body.name, body.short_description, body.long_description, body.main_menu, body.sub_menu, body.free_v, body.pro_v, body.local_v, body.p_image, body.featured_images, body.free_blend, body.pro_blend, body.local_blend]
    );

    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

productModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE product SET name = ?, short_description = ?, long_description=?, main_menu=?, sub_menu=?, free_v=?, pro_v=?, local_v=?, p_image=?, featured_images=?, free_blend=?, pro_blend=?, local_blend=? WHERE id = ?", 
      [body.name, body.short_description, body.long_description, body.main_menu, body.sub_menu, body.free_v, body.pro_v, body.local_v, body.p_image, body.featured_images, body.free_blend, body.pro_blend, body.local_blend, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

productModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM product WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

productModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM product"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};


productModule.get_products_by_menu = async (body, result) => {
  try {
    let res;
    if(!body.sub_menu)
      res = await sql.promise().query(
        "SELECT * FROM product WHERE main_menu = ? ",
        [body.main_menu]
      );
    else
      res = await sql.promise().query(
        "SELECT * FROM product WHERE main_menu = ? AND sub_menu = ? ",
        [body.main_menu, body.sub_menu]
      );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

productModule.get_product_by_id = async (body, result) => {
  try {
    const  res = await sql.promise().query(
      "SELECT * FROM product WHERE id = ? ",
      [body.id]
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};




module.exports = productModule;
