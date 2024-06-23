const userService = require('../services/users');

const createUser = async (req, res) => {
    const user = await userService.createUser(
        req.body.username,
        req.body.displayName,
        req.body.password,
        req.body.profilePicture
    );
    res.json(user);
}

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
}

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] })
    }
    res.json(user);
}

const editUser = async (req, res) => {
    const user = await userService.editUser(
        req.params.id, 
        req.body.displayName,
        req.body.username,
        req.body.password,
        req.body.profilePicture)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] })
    }
    res.json(user)
}

const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] })
    }
    res.json(user)
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    editUser,
    deleteUser
}