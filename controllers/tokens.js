const tokenService = require('../services/tokens');

const createToken = async (req, res) => {
    return res.status(200).json(await tokenService.createToken(req.body.id))
}

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const { valid, data, error } = tokenService.verifyToken(token);

        if (valid) {
            req.user = data;
            return next();
        } else {
            return res.status(401).send("Invalid Token");
        }
    } else {
        return res.status(403).send('Token required');
    }
}

module.exports = {
    isLoggedIn,
    createToken
}