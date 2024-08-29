const videoService = require('../services/videos');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Custom storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const get20Videos = async (req, res) => {
    const videos = await videoService.get20Videos();
    res.json(videos);
}

const getRecommendation = async(req, res) => {
    const pid = req.params.pid;
    const videos = await videoService.getRecommendation(pid);


    res.json(videos);
}

const getUserVideos = async(req, res) => {
    const videos = await videoService.getUserVideos(req.params.id);
    res.json(videos);
}

const createVideo = async (req, res) => {
    upload.fields([{ name: 'video', maxCount: 1 }, { name: 'img', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        } else {
            if (!req.files || !req.files['video'] || !req.files['img']) {
                return res.status(400).send({ message: 'Both video and image files are required!' });
            } else {
                const { title, views, likes, date, description, user, comments } = req.body;
                const videoPath = req.files['video'][0].path;
                const fullVideoPath = `http://localhost:${process.env.SERVER_PORT}/${videoPath}`
                const imgPath = req.files['img'][0].path;

                try {
                    // Read image file and convert to base64
                    const imgBuffer = await fs.readFile(imgPath);
                    const img64 = imgBuffer.toString('base64');
                    const imgMimeType = path.extname(imgPath).substring(1); // Get the file extension without the dot
                    const base64DataUrl = `data:image/${imgMimeType};base64,${img64}`;
                    await fs.unlink(imgPath);

                    // Call the video service to create the video
                    const video = await videoService.createVideo(
                        title,
                        views || null,
                        likes || null,
                        date || null,
                        base64DataUrl,
                        description,
                        fullVideoPath,
                        req.params.id,
                        comments || null
                    );

                    // Save the video
                    const savedVideo = await video.save();
                    return res.status(200).send({ message: 'Video uploaded and saved!', video: savedVideo });
                } catch (error) {
                    return res.status(500).send({ message: 'Error processing image or saving video to database.', error });
                }
            }
        }
    });
};


const getVideo = async(req, res) => {
    const video = await videoService.getVideo(req.params.pid);
    // res.json({videoData: video, videoFile: );
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
    res.json({video});
}

const deleteVideo = async(req, res) => {
    const video = await videoService.deleteVideo(req.params.pid)
    if (!video) return res.status(404).json({ errors: ['video not found'] })
    res.json(video)
}

const handleVideoView = async(req, res) => {
    const id = req.params.id;
    const pid = req.params.pid;

    videoService.handleVideoView(id, pid);
    return res.status(200);
}


module.exports = {
    get20Videos,
    getUserVideos,
    createVideo,
    getVideo,
    editVideo,
    deleteVideo,
    handleVideoView,
    getRecommendation
}