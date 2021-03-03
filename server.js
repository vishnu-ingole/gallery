const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const db = require("./models/index");
const app = express();
const multer = require('multer');
var cors = require('cors');
require('custom-env').env();
app.use(cors());
const router = require('./route/route')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1',router)
const PORT =9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//console.log(process.env.TOKEN_SECRET);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});
