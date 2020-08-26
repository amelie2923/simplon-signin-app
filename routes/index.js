const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const { formatters } = require('debug');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sheets' });
});

router.post('/data', pdfController.dataSheets);

router.get('/dashboard', pdfController.dashboard);

router.get('/createpdf/:id', pdfController.createPdf);

module.exports = router;
