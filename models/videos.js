const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Video = new Schema({
    title: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // video: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'videos.files'
    // },
    video: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: String,
        ref: "Comment"
    }],
}, {versionKey: false});

module.exports = mongoose.model('Video', Video, "videos");