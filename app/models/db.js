const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB`);
});

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error(`Error closing MongoDB connection: ${error}`);
        process.exit(1);
    }
});

module.exports = db;
