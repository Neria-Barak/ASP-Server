const videoService = require('../services/videos');


const get20Videos = async (req, res) => {
    const videos = await videoService.get20Videos();
    res.json(videos);
}

const getUserVideos = async(req, res) => {
    const videos = await videoService.getUserVideos(req.params.id);
    res.json(videos);
}

const createVideo = async(req, res) => {
    const video = await videoService.createVideo(
        req.body.title,
        req.body.views || null,
        req.body.likes || null,
        req.body.date || null,
        req.body.img,
        req.body.description,
        req.body.video,
        req.params.id,
        req.body.comments || null
    );
    res.json(video);
}

const getVideo = async(req, res) => {
    const video = await videoService.getVideo(req.params.pid);
    res.json(video);
}

const editVideo = async(req, res) => {
    const video = await videoService.editVideo(
        req.body.title,
        req.body.img,
        req.body.description,
        req.body.video,
        req.params.pid,
    );
    if (!video) return res.status(404).json({ errors: ['Video not found'] })
    res.json(video);
}

const deleteVideo = async(req, res) => {
    const video = await videoService.deleteVideo(req.params.pid)
    if (!video) return res.status(404).json({ errors: ['video not found'] })
    res.json(video)
}

module.exports = {
    get20Videos,
    getUserVideos,
    createVideo,
    getVideo,
    editVideo,
    deleteVideo
}