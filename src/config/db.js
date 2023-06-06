const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URI
const DB_URI_CLOUD = 'mongodb+srv://cluster0.wtt02mk.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority'

const credentials = '../../cert/X509-cert-224455657921162270.pem'

const connectDB = async () => {
  const usedDB = process.env.NODE_ENV === "production" ? DB_URI_CLOUD : DB_URI
  console.log({ usedDB })
  try {
    await mongoose.connect(usedDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      sslKey: credentials,
      sslCert: credentials,
    });

    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
