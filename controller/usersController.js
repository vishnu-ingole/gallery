

const sequelize = require("sequelize");
const Op = sequelize.Op;
const db = require('../models/index');
const Users = db.users;
const Album = db.album;
const { body, validationResult } = require('express-validator/check');
const { responseMessage } = require('../response/message');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.validate = (method) => {
  switch (method) {
    case 'createUsers': {
      return [
        body('firstName', responseMessage.error.nameRequired).isLength({ min: 5 }),
        body('lastName', responseMessage.error.lastRequired).isLength({ min: 5 }),
        body('email', responseMessage.error.emailRequired).isLength({ min: 5 }).isEmail(),

      ]
    }
    case 'login': {
      return [
        body('email', responseMessage.error.emailRequired).isLength({ min: 5 }).isEmail(),
        body('password', responseMessage.error.lastRequired).isLength({ min: 5 }),


      ]
    }
  }
}
// add data in databa,se
exports.createUsers = async (req, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array()[0].msg });
    return;
  }
  const { firstName, lastName, email, password, state, city } = req.body;
  let requestData = {};


  let salt = await bcrypt.genSalt(10);


  let newPassword = await bcrypt.hash(password, salt);

  //create object         
  requestData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: newPassword,
    state: state,
    city: city
  };
  try {
    Users.create(requestData)
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: responseMessage.success.dataAdded,
          result: {
            data
          }

        })
      });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: responseMessage.error.dataNotDeleted,
    })
  }

};



exports.login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array()[0].msg });
    return;
  }
  const { email, password } = req.body;
  console.log(req.query);

  const user = await Users.findOne({ where: { email: email } });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      //let firstName= user.firstName;
      const accessToken = jwt.sign({ firstName: user.firstName }, process.env.TOKEN_SECRET, { expiresIn: '24h' })
      res.status(200).json({
        status: 'success',
        token: accessToken,
        message: responseMessage.success.loginSuccessfully
      });

    } else {
      res.status(400).json({
        status: 'fail',
        message: responseMessage.error.invalidPassword
      });
    }
  } else {
    res.status(401).json({
      status: 'fail',
      message: responseMessage.error.userNotExist
    })
  }

}


