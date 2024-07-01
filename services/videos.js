const Video = require('../models/videos');
  

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const get20Videos = async () => {
    // Fetch 10 random videos
    const randomVideos = await Video.aggregate([{ $sample: { size: 10 } }]);

    // Fetch 10 most-watched videos
    const mostWatchedVideos = await Video.find().sort({ views: -1 }).limit(10);

    // Combine the results
    let videos = [...randomVideos, ...mostWatchedVideos];

    // Shuffle the combined results
    videos = shuffle(videos);

    //videos = [...new Set(videos)]

    return videos;
}

const getUserVideos = async (id) => {
    const videos = await Video.find({ user: id }).exec();
    return videos;
}

const createVideo = async (title, views, likes, date, img,
                           description, videoPath, user, comments) => {
    const video = new Video({
        title,
        views: (views != null) ? views : 0,
        likes: (likes != null) ? likes : 0,
        date: (date != null) ? date : Date.now(),
        img,
        description,
        video: videoPath,
        user,
        comments: (comments != null) ? comments : []
    })
    return await video.save();                        
}

const getVideo = async (pid) => {
    const video = await Video.findById(pid);
    return video;
}

const editVideo = async (title, img, description, vid, pid) => {
    let video = await Video.findById(pid);
    if (!video) return false
    video.title = title
    video.img = img
    video.description = description
    video.vid = vid
    await video.save();
    return true
}

const deleteVideo = async (pid) => {
    let video = await Video.findByIdAndDelete(pid);
    return video != []
}

module.exports = {
    get20Videos,
    getUserVideos,
    createVideo,
    getVideo,
    editVideo,
    deleteVideo
}