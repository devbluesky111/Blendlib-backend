const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

var whitelist = ['http://localhost:3000', 'http://localhost:3001'];
// var whitelist = ['https://sumish.herokuapp.com', 'https://sumish-admin.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE']
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('upload'));

require("./app/routes/menu.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/cover.routes.js")(app);


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
