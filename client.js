const net = require('net');
const customEnv = require('custom-env');
const Video = require('./models/videos');

function sendMessageToCppServer(message) {
    customEnv.env(process.env.NODE_ENV, './config');
    return new Promise((resolve, reject) => {
        // Create a new TCP client
        const client = new net.Socket();

        const host = process.env.CPP_SERVER_HOST;
        const port = process.env.CPP_SERVER_PORT;

        // Connect to the C++ server
        client.connect(port, host, () => {
            // Send the message to the C++ server
            client.write(message);
        });

        // Listen for data from the C++ server
        client.on('data', (data) => {
            // Resolve the promise with the received data
            resolve(data.toString());

            // Close the connection
            client.end();
        });

        // Handle connection close
        client.on('close', () => {
        });

        // Handle errors
        client.on('error', (err) => {
            console.error('Connection error:', err);
            reject(err);
        });
    });
}

async function sendViewToServer(id, pid) {
    sendMessageToCppServer(`USER:${id}VIDEO:${pid}`)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

async function init() {
    const videos = await Video.find().exec();
    const message = videos.map(video => `${video._id}:${video.views}`).join(';');

    sendMessageToCppServer(message);
}


async function parseStringToList(inputString) {
    // Split the string and map each PID to a promise that resolves to the result of Video.findById
    const results = await Promise.all(inputString.split(';').map(pid => Video.findById(pid)));
    return results;
}

async function getRecommendation(pid) {
    try {
        const response = await sendMessageToCppServer("PID:" + pid.toString());
        const videoList = await parseStringToList(response);
        return videoList;
    } catch (err) {
        console.error('Error', err);
    }
}



module.exports = {
    init,
    sendViewToServer,
    getRecommendation
}