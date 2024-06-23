const mongoose = require('mongoose');
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

(async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connection.db.dropDatabase();
    await connection.disconnect();
})();
