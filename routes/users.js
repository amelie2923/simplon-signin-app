const express = require('express');
const router = express.Router();
const User = require('../models/User');
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/login', usersController.login);

// router.get('/register', usersController.register);

// router.post('/signup', usersController.signup)

// /* POST log user */

// router.post('/signin', usersController.signin);

// /* POST create user */

// // router.post('/signup', usersController.signup);

module.exports = router;
