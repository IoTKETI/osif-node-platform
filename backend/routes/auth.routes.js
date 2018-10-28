var express = require('express');
var router = express.Router();

var authManager = require('../managers/auth.manager.js')

router.post('/token', authManager.cloudLogin);

router.use('/check', authManager.authCheck);
router.get('/check', authManager.check);

module.exports = router;
