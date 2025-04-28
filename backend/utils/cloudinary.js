const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "flowers", // Optional folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
// Use `upload.single("image")` in your route
