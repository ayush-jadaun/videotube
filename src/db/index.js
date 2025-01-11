import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
