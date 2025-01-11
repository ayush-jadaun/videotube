import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

(async function () {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            const result = await cloudinary.uploader.upload(localFilePath);
            console.log("Upload successful:", result);

            fs.unlinkSync(localFilePath, (err) => {
                if (err) {
                    console.error("Error deleting the file:", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
        }
    };


    module.exports = { uploadOnCloudinary };
})();