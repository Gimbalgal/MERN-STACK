// const express = require("express");
// const router = express.Router();
// const upload = require("../../Image/image.Multer"); // Import multer with Cloudinary storage
// const ImageModel = require('../models/imageModel')

// // GET all images
// router.get("/images", async (req, res) => {
//     try {
//         const images = await ImageModel.find();
//         res.json(images);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching images", error });
//     }
// });

// // GET image by ID
// router.get("/images/:id", async (req, res) => {
//     try {
//         const image = await ImageModel.findById(req.params.id);
//         if (!image) return res.status(404).json({ message: "Image not found" });

//         res.json(image);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching image", error });
//     }
// });

// // **NEW: POST route to upload images to Cloudinary**
// router.post("/upload", upload.single("image"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No image uploaded" });
//         }

//         console.log("Uploaded File Details:", req.file); // Log file details

//         const newImage = new ImageModel({
//             name: req.body.name,
//             image: req.file.path, // Cloudinary returns `req.file.path` as the image URL
//         });

//         await newImage.save();
//         res.json({ success: true, image: newImage });
//     } catch (error) {
//         console.error("Error uploading image:", error); // Log the full error in the terminal
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

// Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Upload multiple images
router.post('/upload', upload.array('images'), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploaded = [];

        for (const file of req.files) {
            const stream = new Readable();
            stream.push(file.buffer);
            stream.push(null);

            const uploadStream = gfsBucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            stream.pipe(uploadStream);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', () => {
                    uploaded.push({ filename: uploadStream.filename, id: uploadStream.id });
                    resolve();
                });
                uploadStream.on('error', reject);
            });
        }

        res.status(201).json({ message: 'Files uploaded', files: uploaded });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Upload error', error: err });
    }
});

// Serve image by filename
router.get('/:filename', (req, res) => {
    try {
        const downloadStream = gfsBucket.openDownloadStreamByName(req.params.filename);

        downloadStream.on('error', () => {
            return res.status(404).json({ message: 'Image not found' });
        });

        res.set('Content-Type', 'image/jpeg'); // or detect type
        downloadStream.pipe(res);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching image', error: err });
    }
});

module.exports = router;
