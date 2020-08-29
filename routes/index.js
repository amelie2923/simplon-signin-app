const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const usersController = require('../controllers/usersController');
const { formatters } = require('debug');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sheets' });
});

router.post('/data', pdfController.dataSheets);

router.get('/dashboard', pdfController.dashboard);

router.get('/createpdf', pdfController.createPdf);

router.get('/template', pdfController.template);

router.post('/createtemplate', pdfController.createTemplate);

router.get('/login', usersController.login);

router.get('/register', usersController.register);

router.post('/signup', usersController.signup)

/* POST log user */

router.post('/signin', usersController.signin);

/* POST create user */

// router.post('/signup', usersController.signup);

module.exports = router;
