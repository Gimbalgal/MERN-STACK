require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const connectDB = require("./database");
const flowerRouter = require('./src/routes/flowerRoutes');
const userRoutes = require('./src/routes/userRoutes');
const ImageModel = require('./src/models/imageModel');  
const imageRoutes = require('./src/routes/imageRoutes');

const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Store images in memory, then save to MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Upload single image & save to MongoDB
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        
        const newImage = new ImageModel({
            name: req.file.originalname,
            image: {
                data: req.file.buffer, 
                contentType: req.file.mimetype
            }
        });

        await newImage.save();
        res.status(201).json({ message: "Image uploaded and saved successfully", file: req.file });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error", error });
    }
});

//  GET Image by ID
app.get('/image/:id', async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id);
        if (!image) return res.status(404).json({ message: "Image not found" });

        res.set('Content-Type', image.image.contentType);
        res.send(image.image.data);
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
});

//  Log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Serve the flowers page
app.get('/flowers-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'flowers.html'));
});

// Flower & Image Routes
app.use('/api/flowers', flowerRouter);  
app.use('/api/user', userRoutes);







const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Connected to DB and server is listening on port ${PORT}`);
});
