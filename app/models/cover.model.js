const sql = require("./db.js");

// constructor
const coverModule = function(coverGroup) {
  this.id = coverGroup.id;
  this.title = coverGroup.title;
  this.subtitle = coverGroup.subtitle;
  this.image = coverGroup.image;
  this.url = coverGroup.url;
};

// coverModule.create = async (body, result) => {
//   try {
//     const resp = await sql.promise().query(
//       "SELECT * FROM cover WHERE email = ? ",
//       [body.email]
//     );

//     if (resp[0].length > 0) {
//       result(null, {status: 'fail'});
//     } else {
//       const res = await sql.promise().query(
//         "INSERT INTO cover SET name = ?, lastName = ?, nickname = ?, phone = ?, email = ?, company = ?, jobTitle = ?, birthday = ?, address = ?, notes = ?, password = ?, membership = ?, pending = ?, status = ?, created = NOW(), last_login = NOW() ", 
//         [body.name, body.lastName, body.nickname, body.phone, body.email, body.company, body.jobTitle, body.birthday, body.address, body.notes, body.password, body.membership, body.pending, body.status]
//       );
  
//       result(null, { status: 'success', id: res.insertId });
//     }
   
//   } catch (err) {
//     result(err, null);
//   };
// };

// coverModule.update = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "UPDATE cover SET name = ?, lastName = ?, nickname = ?, phone = ?, email = ?, company = ?, jobTitle = ?, birthday = ?, address = ?, notes = ?, password = ?, membership = ?, pending = ?, status = ? WHERE id = ?", 
//       [body.name, body.lastName, body.nickname, body.phone, body.email, body.company, body.jobTitle, body.birthday, body.address, body.notes, body.password, body.membership, body.pending, body.status, body.id]
//     );

//     if (res.affectedRows === 0) {
//       throw { kind: "not_found" };
//     }

//     result(null, { id: body.id });
//   } catch (err) {
//     result(err, null);
//   };
// };

// coverModule.delete = async (ids, result) => {
//   try {    
//     let query = [];
//     ids.map((id)=>{
//       query.push('id = ' + id);
//     });
//     let query_str = query.join(' OR ');
    
//     await sql.promise().query(
//       "DELETE FROM cover WHERE " + query_str
//     );

//     result(null, { ids: ids });
//   } catch (err) {
//     result(err, null);
//   };
// };

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

// coverModule.get_cover_by_id = async (body, result) => {
//   try {
//     const  res = await sql.promise().query(
//       "SELECT * FROM cover WHERE id = ? ",
//       [body.id]
//     );

//     result(null, res);
//   } catch (err) {
//     result(err, null);
//   };
// };


module.exports = coverModule;
