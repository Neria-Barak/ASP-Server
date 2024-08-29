const path = require('path');

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(cors());

const mongoose = require('mongoose');
const customEnv = require('custom-env');


(async () => {
    customEnv.env(process.env.NODE_ENV, './config');
    
    
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });;
    
    
    server.use('/public', express.static(path.join(__dirname, 'public'))); 

    // server.use(express.static(path.join(__dirname, 'public'))); 


    server.use(bodyParser.json({ limit: '5mb' }));
    server.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    server.use(express.json())
    
    const users = require('./routes/users')
    const videos = require('./routes/videos')
    const tokens = require('./routes/tokens')
    server.use('/api/users', users)
    server.use('/api/videos', videos)
    server.use('/api/tokens', tokens)

    //___________________________
    // const client = require('./client');
    // client.init();
    // await new Promise(r => setTimeout(r, 1000));
    // //user1 watches video1
    // client.sendViewToServer("66cf21c1b9a6ecd97353ca65", "66cf21c1b9a6ecd97353ca67")
    // await new Promise(r => setTimeout(r, 1000));
    // //user1 watches video2
    // client.sendViewToServer("66cf21c1b9a6ecd97353ca65", "66cf21c1b9a6ecd97353ca69")
    // await new Promise(r => setTimeout(r, 1000));
    // //user2 watches video1
    // client.sendViewToServer("66cf21c1b9a6ecd97353ca71", "66cf21c1b9a6ecd97353ca67")
    // await new Promise(r => setTimeout(r, 1000));
    // //user2 watches video2
    // client.sendViewToServer("66cf21c1b9a6ecd97353ca71", "66cf21c1b9a6ecd97353ca69")
    // await new Promise(r => setTimeout(r, 1000));
    // //user2 watches video3
    // client.sendViewToServer("66cf21c1b9a6ecd97353ca71", "66cf21c1b9a6ecd97353ca6b")
    // await new Promise(r => setTimeout(r, 1000));
    // //user3 watches video2
    // //client.sendViewToServer("66cf21c1b9a6ecd97353ca7d", "66cf21c1b9a6ecd97353ca69")

    // //get recommendation for video2
    // client.getRecommendation("66cf21c1b9a6ecd97353ca69");
    // await new Promise(r => setTimeout(r, 1000));
    // client.getRecommendation("66cf21c1b9a6ecd97353ca8b")




    // server.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // });
    
    server.listen(process.env.SERVER_PORT, () => {
        console.log('Server running on http://localhost:8080');
    });
})();