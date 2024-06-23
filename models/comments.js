const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
}, {versionKey: false});

module.exports = mongoose.model('Comment', Comment, "comments");