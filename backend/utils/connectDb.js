const mongoose = require("mongoose");

// Replace the URL below with your own MongoDB URL.
const MONGODB_URI = "mongodb://127.0.0.1:27017/bikeportal";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectToDatabase;
