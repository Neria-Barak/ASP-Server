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
    server.use(bodyParser.json({ limit: '5mb' }));
    server.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    server.use(express.json())
    
    const users = require('./routes/users')
    const videos = require('./routes/videos')
    const tokens = require('./routes/tokens')
    server.use('/api/users', users)
    server.use('/api/videos', videos)
    server.use('/api/tokens', tokens)


    server.listen(process.env.SERVER_PORT, () => {
        console.log('Server running on http://localhost:8080');
    });
})();