const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// app.use(cors());
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true, methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'] }));
app.use(cors({ origin: ['https://sumish.herokuapp.com', 'https://sumish-admin.herokuapp.com'], credentials: true, methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'] }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('upload'));

require("./app/routes/menu.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
