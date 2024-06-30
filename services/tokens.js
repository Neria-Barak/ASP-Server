const User = require('../models/users');

// Use a library to perform the cryptographic operations
const jwt = require("jsonwebtoken");

// We are using cryptography, to ensure that no one else will be able to impersonate users
// To that end, we are going to use the following secret key
// Keep it safe. No one except the server should know this secret value
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, key);
        return { valid: true, data };
    } catch (err) {
        return { valid: false, error: err };
    }
};

const createToken = async (id) => {
    return jwt.sign(id, key)
}

const getUserByToken = async (token) => {
    const id = jwt.verify(token, key);
    let user = (await User.findById(id));
    if (!user) return null
    return user;
}

module.exports = {
    verifyToken,
    createToken,
    getUserByToken
}