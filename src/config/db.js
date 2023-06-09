const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URI

const DB_URI_CLOUD = `mongodb+srv://myProduct:4CEPqgadCw4ioueh@cluster0.7j1u2jh.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    const usedDB = process.env.NODE_ENV === "production" ? DB_URI_CLOUD : DB_URI
    console.log({usedDB, nodeENV: process.env.NODE_ENV})
    await mongoose.connect(usedDB, {
      dbName: 'mydatabase',
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
