var express = require('express');
var router = express.Router();
var sheetsController = require('../controllers/sheetsController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', sheetsController.getData);


module.exports = router;
