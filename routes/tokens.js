const express = require('express');
var router = express.Router();
const tokensController = require('../controllers/tokens');

router.route('/')
    .post(tokensController.createToken)
    .get(tokensController.isLoggedIn, tokensController.getUserByToken);

router.route('/login')
    .post(tokensController.login);

module.exports = router;