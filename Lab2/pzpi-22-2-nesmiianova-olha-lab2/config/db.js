const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use test URI if provided (for testing with mongodb-memory-server)
    const uri = process.env.MONGODB_TEST_URI || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 