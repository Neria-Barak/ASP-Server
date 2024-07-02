const Comment = require('../models/comments');

const getVideoComments = async (pid) => {
    const comments = await Comment.find({ video: pid }).exec();
    return comments;
}

const createComment = async (content, likes, date, user, video) => {
    const comment = new Comment({
        content,
        likes: (likes != null) ? likes : 0,
        date: (date != null) ? date : Date.now(),
        user,
        video
    })
    return await comment.save();                        
}

const getComment = async (cid) => {
    const comment = await Comment.findById(cid);
    return comment;
}

const editComment = async (content, cid) => {
    let comment = await Comment.findById(cid);
    if (!comment) return false
    comment.content = content
    await comment.save();
    return true
}

const deleteComment = async (cid) => {
    let comment = await Comment.findByIdAndDelete(cid);
    return comment != []
}

module.exports = {
    getVideoComments,
    createComment,
    getComment,
    editComment,
    deleteComment
}