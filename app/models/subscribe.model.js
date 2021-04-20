const sql = require("./db.js");

// constructor
const subscribeModule = function(subscribeGroup) {
  this.id = subscribeGroup.id;
  this.email = subscribeGroup.email;

  
};

subscribeModule.subscribe = async (body, result) => {
  try {
      const res = await sql.promise().query(
        "INSERT INTO subscribe SET email = ? ",
        [body.email]
      );
  
      result(null, { status: 'success', id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

module.exports = subscribeModule;
