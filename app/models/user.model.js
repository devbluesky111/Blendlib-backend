const sql = require("./db.js");

// constructor
const userModule = function(userGroup) {
  this.id = userGroup.id;
  this.name = userGroup.name;
  this.lastName = userGroup.lastName;
  this.nickname = userGroup.nickname;
  this.phone = userGroup.phone;
  this.email = userGroup.email;
  this.company = userGroup.company;
  this.jobTitle = userGroup.jobTitle;
  this.birthday = userGroup.birthday;
  this.address = userGroup.address;
  this.notes = userGroup.notes;
  this.password = userGroup.password;
  this.membership = userGroup.membership;
  this.pending = userGroup.pending;
  this.status = userGroup.status;
};

userModule.create = async (body, result) => {
  try {
    const resp = await sql.promise().query(
      "SELECT * FROM user WHERE email = ? ",
      [body.email]
    );

    if (resp[0].length > 0) {
      result(null, {status: 'fail'});
    } else {
      const res = await sql.promise().query(
        "INSERT INTO user SET name = ?, lastName = ?, nickname = ?, phone = ?, email = ?, company = ?, jobTitle = ?, birthday = ?, address = ?, notes = ?, password = ?, membership = ?, pending = ?, status = ?, created = NOW(), last_login = NOW() ", 
        [body.name, body.lastName, body.nickname, body.phone, body.email, body.company, body.jobTitle, body.birthday, body.address, body.notes, body.password, body.membership, body.pending, body.status]
      );
  
      result(null, { status: 'success', id: res.insertId });
    }
   
  } catch (err) {
    result(err, null);
  };
};

userModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE user SET name = ?, lastName = ?, nickname = ?, phone = ?, email = ?, company = ?, jobTitle = ?, birthday = ?, address = ?, notes = ?, password = ?, membership = ?, pending = ?, status = ? WHERE id = ?", 
      [body.name, body.lastName, body.nickname, body.phone, body.email, body.company, body.jobTitle, body.birthday, body.address, body.notes, body.password, body.membership, body.pending, body.status, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

userModule.toggle_restrict = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE user SET status = ? WHERE id = ?", 
      [body.status === 'on' ? 'off' : 'on', body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

userModule.pending_solve = async (body, result) => {
  try {
    let res;
    if(body.type === 'allow') {
      res = await sql.promise().query(
        "UPDATE user SET membership = ?, pending = ? WHERE id = ?", 
        [body.membership, 'no', body.id]
      );
    } else if (body.type === 'deny') {
      res = await sql.promise().query(
        "UPDATE user SET pending = ? WHERE id = ?", 
        ['no', body.id]
      );
    }

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

userModule.pending_membership = async (body, result) => {
  try {
    let res;
    if(body.type === 'cancel') {
      res = await sql.promise().query(
        "UPDATE user SET pending = ? WHERE id = ?", 
        ['no', body.id]
      );
    } else if (body.type === 'ask') {
      res = await sql.promise().query(
        "UPDATE user SET pending = ? WHERE id = ?", 
        [body.value, body.id]
      );
    }

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

userModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM user WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

userModule.getAll = async (body, result) => {
  try {
    let res;
    if(body.params === 'all')
      res = await sql.promise().query(
        "SELECT * FROM user"
      );
    else if (body.params === 'pending')
      res = await sql.promise().query(
        "SELECT * FROM user WHERE pending = 'pro' OR pending = 'platinum' "
      );
    else if (body.params === 'restrict')
      res = await sql.promise().query(
        "SELECT * FROM user WHERE status = 'off' "
      );
    else 
      res = [[]];

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

userModule.get_user_by_id = async (body, result) => {
  try {
    const  res = await sql.promise().query(
      "SELECT * FROM user WHERE id = ? ",
      [body.id]
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

userModule.login = async (req, res) => {
  // console.log('---ss--->', req.session.email);
  // console.log('---cc--->', req.cookies.rememberMeEmail);
  try {
    const resp = await sql.promise().query(
      "SELECT * FROM user WHERE email = ? AND password = ? ",
      [req.body.email, req.body.password]
    );

    const respo = await sql.promise().query(
      "SELECT * FROM user WHERE email = ? AND password = ? AND status = 'on' ",
      [req.body.email, req.body.password]
    );

    if(resp[0].length === 0) {
      res.send({status: 'fail'});
    } else if (respo[0].length === 0) {
      res.send({status: 'restrict'});
    } else {
      req.session.email = req.body.email;
      // res.cookie('rememberMeEmail', '', {maxAge: 7*24*60*60*1000});
      res.send({status: 'success'});
    }

  } catch (err) {
    throw(err);
  };
};

userModule.check_login = async (req, res) => {
  // console.log('---ss--->', req.session.email);
  // console.log('---cc--->', req.cookies.rememberMeEmail);
  try {
    
    if (req.session.email) {
      const resp = await sql.promise().query(
        "SELECT * FROM user WHERE email = ? ",
        [req.session.email]
      );
      res.send({status: 'success', data: resp});
    } else {
      res.send({status: 'fail'});
    }

  } catch (err) {
    throw(err);
  };
};

module.exports = userModule;
