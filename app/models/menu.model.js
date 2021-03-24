const sql = require("./db.js");

// constructor
const menuModule = function(menuGroup) {
  this.id = menuGroup.id;
  this.name = menuGroup.name;
  this.order = menuGroup.order_num;
  this.status = menuGroup.status;
};

menuModule.create = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO menu SET name = ?, order_num = ?, status=?, created = NOW()", 
      [body.name, body.order, body.status]
    );

    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

menuModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE menu SET name = ?, order_num = ?, status=? WHERE id = ?", 
      [body.name, body.order, body.status, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

menuModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM menu WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

menuModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM menu ORDER BY order_num"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};


menuModule.getAll_o = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM menu WHERE status = 'on' ORDER BY order_num"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};






menuModule.createSubMenu = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO submenu SET m_id = ?, name = ?, order_num = ?, status=?, created = NOW()", 
      [body.m_id, body.name, body.order_num, body.status]
    );

    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

menuModule.updateSubMenu = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE submenu SET m_id = ?, name = ?, order_num = ?, status=? WHERE id = ?", 
      [body.m_id, body.name, body.order_num, body.status, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

menuModule.deleteSubMenu = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM submenu WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

menuModule.getAllSubMenu = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM submenu ORDER BY order_num"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

menuModule.getAllSubMenu_o = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM submenu WHERE status = 'on' ORDER BY order_num"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

module.exports = menuModule;
