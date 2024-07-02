const express = require('express');
var router = express.Router();
const videoController = require('../controllers/videos');
const commentController = require('../controllers/comments');
const tokensController = require('../controllers/tokens');

router.route('/')
    .get(videoController.get20Videos)

router.route('/:pid')
    .get(commentController.getVideoComments)
    .post(tokensController.isLoggedIn, commentController.createComment)


module.exports = router;