const sql = require("./db.js");

// constructor
const coverModule = function(coverGroup) {
    this.id = coverGroup.id;
    this.title = coverGroup.title;
    this.subtitle = coverGroup.subtitle;
    this.cover_image = coverGroup.cover_image;
};

coverModule.create = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO cover SET title = ?, subtitle = ?, cover_image = ?, created = NOW()", 
      [body.title, body.subtitle, body.cover_image]
    );
    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

coverModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE cover SET title = ?, subtitle = ?, cover_image = ? WHERE id = ?", 
      [body.title, body.subtitle, body.cover_image, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

coverModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM cover WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

coverModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM cover ORDER BY id"
    );
    
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

coverModule.get_cover_by_id = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM cover WHERE id = ? ",
      [body.id]
    );
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

coverModule.upload = async (body, today, filename, result) => {
  try {
    let new_file;
    new_file = today + '/' + filename;

    const [res, fields] = await sql.promise().query(
      "UPDATE cover SET " + body.name + " = ? WHERE id = ?", 
      [new_file, body.id]
    );
    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, {file: new_file});
  } catch (err) {
    result(err, null);
  };
};

module.exports = coverModule;
