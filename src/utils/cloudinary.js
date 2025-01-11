import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Using the promise-based fs module

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath);
    console.log("Upload successful:", result);

    // Delete the local file after uploading
    await fs.unlink(localFilePath);
    console.log("File deleted successfully");

    return result; // Return the result for further processing
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
