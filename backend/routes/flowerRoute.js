const express = require('express');
const { 
    createFlower, 
    getFlower, 
    getFlowers, 
    deleteFlower, 
    updateFlower 
} = require('../controllers/flowerController');

const upload = require('../Image/image.Multer'); // Image upload middleware

const router = express.Router();

// GET all flowers (Includes images)
router.get('/', getFlowers);

// GET a single flower by ID
router.get('/:id', getFlower);

// CREATE a new flower with an image
router.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]), 
    createFlower
);

// UPDATE a flower (Text fields + optional image)
router.patch('/:id', upload.single('image'), updateFlower);

// DELETE a flower
router.delete('/:id', deleteFlower);

module.exports = router;

