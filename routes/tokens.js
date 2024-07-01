const express = require('express');
var router = express.Router();
const tokensController = require('../controllers/tokens');

router.route('/')
    .post(tokensController.createToken)
    .get(tokensController.isLoggedIn, tokensController.getUserByToken);

module.exports = router;