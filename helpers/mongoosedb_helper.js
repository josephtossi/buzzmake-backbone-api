const mongoose = require('mongoose');

const closeDatabaseConnectionOnAbort = () => {
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
}

mongoose.connection.on('disconnected', () => {
    console.log('Db Disconnected');
})

module.exports.closeDatabaseConnectionOnAbort = closeDatabaseConnectionOnAbort;