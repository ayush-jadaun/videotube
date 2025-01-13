import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath);
    console.log("Upload successful:", result);

    await fs.unlink(localFilePath);
    console.log("File deleted successfully");

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicID) => {
  try {
    const result = await cloudinary.uploader.destroy(publicID);
    console.log("Deleted from Cloudinary:", publicID);
    return result;
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error);
    throw error;
  }
};
