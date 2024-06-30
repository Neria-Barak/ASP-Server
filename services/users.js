const mongoose = require('mongoose');
const User = require('../models/users');

const createUser = async (username, displayName, password, profilePicture) => {
    const user = new User({
        username,
        displayName,
        password,
        profilePicture
    })
    return await user.save();
}

const getUsers = async () => {
    return await User
        .find({})
        .exec();
}

const getUserById = async (id) => {
    let user = (await User.findById(id));
    if (!user) return null
    return user;
}

const editUser = async (id, displayName, username, password, profilePicture) => {
    let user = await User.findById(id);
    if (!user) return false
    user.displayName = displayName
    user.username = username
    user.password = password
    user.profilePicture = profilePicture
    await user.save();
    return true
}

const deleteUser = async (id) => {
    try {
        let user = await User.findByIdAndDelete(id);
        if (!user) {
            return false;
        }
        // Related videos and comments are automatically deleted by the middleware
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};


const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ username: username, password: password });
        return user;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}



module.exports = {
    createUser,
    getUsers,
    getUserById,
    editUser,
    deleteUser,
    authenticateUser
}