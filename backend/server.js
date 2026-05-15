require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/globaltna';
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
