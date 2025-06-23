const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 60000, 
            connectTimeoutMS: 30000 
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error(' MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
