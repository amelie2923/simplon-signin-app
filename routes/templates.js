const express = require('express');
const router = express.Router();
const controller = require('../controllers/templatesController')

router.get('/', controller.index);
router.post('/create', controller.create);

module.exports = router;
