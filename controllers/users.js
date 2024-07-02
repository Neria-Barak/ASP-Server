const userService = require('../services/users');
const tokenService = require('../services/tokens')
const fs = require('fs').promises;

const createUser = async (req, res) => {
    // const imgPath = req.file.path;
    // const imgPath = req.body.profilePicture;
    // const imgBuffer = await fs.readFile(imgPath);
    // const img64 = imgBuffer.toString('base64');
    // await fs.unlink(imgPath);
    const user = await userService.createUser(
        req.body.username,
        req.body.displayName,
        req.body.password,
        req.body.profilePicture
    );
    const token = await tokenService.createToken(user._id.toString());
    res.json({user: user, token: token});
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
    res.json({user});
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