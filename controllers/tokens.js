const tokenService = require('../services/tokens');
const userService = require('../services/users');

const createToken = async (req, res) => {
    const user = await userService.authenticateUser(req.body.username, req.body.password);
    if (!user) 
        return res.status(401).json({message: 'Invalid credentials'});

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

const getUserByToken = async (req, res) => {
    const user = await tokenService.getUserByToken(req.body.token);
    if (!user) {
        return res.status(404).json({ errors: ['Invalid token!'] })
    }
    res.json(user);
}

const validateEditor = async (req, res, next) => {
    const user = tokenService.getUserByToken(req.body.token);
    if (!user)
        return res.status(404).json({ errors: ['Invalid token!'] });

    if (user._id == req.params.id) {
        return next();
    } else {
        return res.status(403).json({errors: ['Validation error!']});
    }
}

const login = async (req, res) => {
    try {
        const user = await userService.authenticateUser(req.body.username, req.body.password);
        if (!user) 
            return res.status(401).json({message: 'Invalid credentials'});
        const token = await tokenService.createToken(user._id);
    
        res.json({
            token,
            user: userData
        });
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    isLoggedIn,
    createToken,
    getUserByToken,
    validateEditor
}