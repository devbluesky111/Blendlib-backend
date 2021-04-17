const sql = require("./db.js");

// constructor
const blogModule = function(blogGroup) {
    this.id = blogGroup.id;
    this.name = blogGroup.name;
    this.title = blogGroup.title;
    this.short_description = blogGroup.short_description;
    this.long_description = blogGroup.long_description;
    this.image = blogGroup.image;
};

blogModule.create = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO blog SET name = ?, title = ?, short_description = ?, long_description =?, image = ?, created = NOW()", 
      [body.name ,body.title, body.short_description, body.long_description, body.image]
    );
    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

blogModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE blog SET name = ?, title = ?, short_description = ?, long_description =?, image = ?, WHERE id = ?", 
      [body.name ,body.title, body.short_description, body.long_description, body.image, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

blogModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM blog WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

blogModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM blog ORDER BY created DESC"
    );
    
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

blogModule.get_blog_by_id = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM blog WHERE id = ? ",
      [body.id]
    );
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

blogModule.upload = async (body, today, filename, result) => {
  try {
    let new_file;
    new_file = today + '/' + filename;

    const [res, fields] = await sql.promise().query(
      "UPDATE blog SET " + body.name + " = ? WHERE id = ?", 
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

module.exports = blogModule;
