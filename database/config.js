const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {

        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error);
        throw new Error('Could not connect to MongoDB, check your logs');
    }
}

module.exports = {
    dbConnection
}