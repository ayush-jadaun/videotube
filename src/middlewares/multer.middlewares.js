import multer from "multer";
import path from "path";
import fs from "fs/promises";

const ensureDirExists = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error("Error creating directory:", err);
  }
};

const tempDir = path.resolve("./public/temp");

await ensureDirExists(tempDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export { upload }; 
