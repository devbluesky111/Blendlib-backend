const sql = require("./db.js");      
const mailjet = require ('node-mailjet').connect('4337b4146f8630fcb23bd9c9bbf5a983', 'a972a69143295825e248e3ff7f1ee23f');

// constructor
const campaignModule = function(campaignGroup) {
  this.id = campaignGroup.id;
  this.subject = campaignGroup.subject;
  this.textPart = campaignGroup.textPart;
  this.htmlPart = campaignGroup.htmlPart;
};

campaignModule.create = async (body, result) => {
    try {
        const [user_emails, field1] = await sql.promise().query("SELECT * FROM user");
        const [emails, field2] = await sql.promise().query("SELECT * FROM subscribe");
        const emails_arr = [];
        user_emails.map(user => {
            emails_arr.push({"Email": user.email});
        });
        emails.map(e => {
            emails_arr.push({"Email": e.email});
        });
        const requests = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": "hello@blendlib.com",
                "Name": "Artem"
            },
            "To": emails_arr,
            "Subject": body.subject,
            "TextPart": body.textPart,
            "HTMLPart": body.htmlPart,
            "CustomID": "TaskID"
            }
        ]
        });

        requests
        .then((result) => {
            sql.promise().query(
                "INSERT INTO campaign SET subject = ?, textPart = ?, htmlPart = ?, created = NOW()", 
                [body.subject ,body.textPart, body.htmlPart]
            ).then((res)=> {
                result(null, { status: 'success', id: res.insertId });
            })
        })
        .catch((err) => {
            result(err, null);
        });

  } catch (err) {
    result(err, null);
  };
};

module.exports = campaignModule;
