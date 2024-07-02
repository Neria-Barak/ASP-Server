const Video = require('../models/videos');
  

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const get20Videos = async () => {
    // Get 10 random videos
    const randomVideos = await Video.aggregate([{ $sample: { size: 10 } }]);

    // Get the IDs of the random videos
    const randomVideoIds = randomVideos.map(video => video._id.toString());

    // Fetch all videos excluding the random videos
    let allVideos = await Video.find({ _id: { $nin: randomVideoIds } }).exec();

    // Sort the remaining videos by views and get the top 10
    const mostWatchedVideos = allVideos.sort((a, b) => b.views - a.views).slice(0, 10);

    // Combine the random and most watched videos
    let videos = [...randomVideos, ...mostWatchedVideos];

    // Shuffle the combined videos array
    videos = shuffle(videos);

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

const view = async (pid) => {
    let video = await Video.findById(pid);
    if (!video) return false
    video.views++;
    console.log(video.views)
    await video.save();
    return true
}

module.exports = {
    get20Videos,
    getUserVideos,
    createVideo,
    getVideo,
    editVideo,
    deleteVideo,
    view
}