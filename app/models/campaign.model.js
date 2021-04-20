const sql = require("./db.js");      
const mailjet = require ('node-mailjet').connect('8244e719835365d03f77058ca7dfcc10', '9860cba58b6a7028465a15875825e174');

// constructor
const campaignModule = function(campaignGroup) {
  this.id = campaignGroup.id;
  this.subject = campaignGroup.subject;
  this.textPart = campaignGroup.textPart;
  this.htmlPart = campaignGroup.htmlPart;
};

campaignModule.create = async (body, result) => {
    try {
        const [emails, field] = await sql.promise().query("SELECT * FROM subscribe");
        const emails_arr = [];
        emails.map(e => {
            emails_arr.push(e.email);
        });
        const requests = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": "www0327333@gmail.com",
                "Name": "Artem"
            },
            "To": [
                {
                "Email": emails_arr,
                "Name": "ttt"
                }
            ],
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
                result(null, { res: res });
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
