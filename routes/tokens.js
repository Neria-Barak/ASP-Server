const express = require('express');
var router = express.Router();
const tokensController = require('../controllers/tokens');

router.route('/').
    post(tokensController.createToken);
    
router.route('/login')
    .post(tokensController.login)

module.exports = router;