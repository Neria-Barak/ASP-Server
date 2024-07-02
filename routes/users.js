const express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const videoController = require('../controllers/videos');
const commentController = require('../controllers/comments');
const tokensController = require('../controllers/tokens');


router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)

router.route('/:id')
    .get(userController.getUserById)
    .patch(tokensController.isLoggedIn, tokensController.validateEditor, userController.editUser)
    .delete(tokensController.isLoggedIn, tokensController.validateEditor, userController.deleteUser)

router.route('/:id/videos')
    .get(videoController.getUserVideos)
    .post(tokensController.isLoggedIn, videoController.createVideo)

router.route('/:id/videos/:pid')
    .get(videoController.getVideo)
    .patch(tokensController.isLoggedIn, tokensController.validateEditor, videoController.editVideo)
    .delete(tokensController.isLoggedIn, tokensController.validateEditor, videoController.deleteVideo)

router.route('/:id/comments/:cid')
    .patch(tokensController.isLoggedIn, tokensController.validateEditor, commentController.editComment)
    .delete(tokensController.isLoggedIn, tokensController.validateEditor, commentController.deleteComment)

module.exports = router;