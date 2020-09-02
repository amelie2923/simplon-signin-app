const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const usersController = require('../controllers/usersController');
const { formatters } = require('debug');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Sheets' });
});

router.post('/data', pdfController.dataSheets);

router.get('/dashboard', pdfController.dashboard);

router.post('/createpdf', pdfController.createPdf);

router.get('/login', usersController.login);

// router.get('/register', usersController.register);
router.get('/', usersController.register);


router.post('/signup', usersController.signup)

router.post('/signin', usersController.signin);

module.exports = router;
