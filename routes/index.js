const express = require('express');
const router = express.Router();
const sheetsController = require('../controllers/sheetsController');
const { formatters } = require('debug');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sheets' });
});

router.post('/data', sheetsController.dataSheets);

module.exports = router;
