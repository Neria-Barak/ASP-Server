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
    let user = await User.findByIdAndDelete(id);
    return user != []
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    editUser,
    deleteUser
}