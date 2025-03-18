const express = require('express');
const router = express.Router();
const ImageModel = require('../Image/image.Multer'); 

// GET all images
router.get('/images', async (req, res) => {
    try {
        const images = await ImageModel.find();  
        res.json(images);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
});

// GET image by ID
router.get('/images/:id', async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        res.json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image', error });
    }
});

module.exports = router;  

