const mongoose = require('mongoose');
const Video = require('./videos');
const Comment = require('./comments');


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

User.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()._id;
    console.log(userId)
    
    // Delete user's videos
    await Video.deleteMany({ user: userId });
    
    // Delete user's comments
    await Comment.deleteMany({ user: userId });
    
    next();
});

module.exports = mongoose.model('User', User, "users");