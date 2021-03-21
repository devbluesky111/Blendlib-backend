const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.use(express.static('upload'));

require("./app/routes/menu.routes.js")(app);


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
