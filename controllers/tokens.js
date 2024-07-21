const tokenService = require('../services/tokens');
const userService = require('../services/users');
const commentService = require('../services/comments');
const videoService = require('../services/videos');

const createToken = async (req, res) => {
    const user = await userService.authenticateUser(req.body.username, req.body.password);
    if (!user) 
        return res.status(401).json({message: 'Invalid credentials'});

    return res.status(200).json(await tokenService.createToken(user._id.toString()))
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
    // const user = await tokenService.getUserByToken(req.body.token);
    const token = req.headers.authorization.split(" ")[1];
    const user = await tokenService.getUserByToken(token);
    if (!user) {
        return res.status(404).json({ errors: ['Invalid token!'] })
    }
    res.status(200).json({user});
}

const validateEditorComment = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if (!user)
        return res.status(404).json({ errors: ['Invalid token!'] });
    
    const comment = await commentService.getComment(req.params.cid);
    const validate_id = comment.user;

    if (user._id.toString() == validate_id.toString()) {
        return next();
    } else {
        return res.status(403).json({errors: ['Validation error!']});
    }
}

const validateEditorVideo = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if (!user)
        return res.status(404).json({ errors: ['Invalid token!'] });

    const video = await videoService.getVideo(req.params.pid);
    const validate_id = video.user;
    if (user._id.toString() == validate_id.toString()) {
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
        const token = await tokenService.createToken(user._id.toString());
    
        res.json({
            token,
            user
        });
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    isLoggedIn,
    createToken,
    getUserByToken,
    validateEditorComment,
    validateEditorVideo,
    login
}