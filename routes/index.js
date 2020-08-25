const express = require('express');
const router = express.Router();
const sheetsController = require('../controllers/sheetsController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/data', sheetsController.dataSheets);

module.exports = router;
