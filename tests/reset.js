const mongoose = require('mongoose');
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
const fs = require('fs').promises;
const path = require('path');

const directory = 'videos/'; // Replace with your directory path

async function deleteFilesExceptSpecific(directory) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            if (file !== 'video1.mp4' && file !== 'video2.mp4' && file !== 'video3.mp4') {
                const filePath = path.join(directory, file);
                await fs.unlink(filePath);
                console.log(`Deleted file: ${file}`);
            }
        }

        console.log('Deletion completed.');
    } catch (error) {
        console.error('Error deleting files:', error);
    }
}


(async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connection.db.dropDatabase();
    await connection.disconnect();
    deleteFilesExceptSpecific(directory);
})();
