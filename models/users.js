const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    videos: [{
        type: String,
        ref: "Video"
    }],
}, {versionKey: false});

module.exports = mongoose.model('User', User, "users");