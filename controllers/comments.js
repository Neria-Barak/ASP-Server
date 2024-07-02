const commentService = require('../services/comments');

const getVideoComments = async(req, res) => {
    const comments = await commentService.getVideoComments(req.params.pid);
    res.json(comments);
}

const createComment = async(req, res) => {
    const comment = await commentService.createComment(
        req.body.content,
        req.body.likes || null,
        req.body.date || null,
        req.body.id,
        req.params.pid,
    );
    res.json(comment);
}

const getComment = async(req, res) => {
    const comment = await commentService.getComment(req.params.pid);
    res.json(comment);
}

const editComment = async(req, res) => {
    const comment = await commentService.editComment(
        req.body.content,
        req.params.cid,
    );
    if (!comment) return res.status(404).json({ errors: ['Comment not found'] })
    res.json(comment);
}

const deleteComment = async(req, res) => {
    const comment = await commentService.deleteComment(req.params.cid)
    if (!comment) return res.status(404).json({ errors: ['Comment not found'] })
    res.json(comment)
}

module.exports = {
    getVideoComments,
    createComment,
    getComment,
    editComment,
    deleteComment
}