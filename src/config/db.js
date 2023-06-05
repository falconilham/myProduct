const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URI

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
