const Flower = require('../models/flowerModel');
const mongoose = require('mongoose');
const cloudinary = require('../../utils/cloudinary');

// Get all flowers
const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find({}).sort({ createdAt: -1 });
        res.status(200).json(flowers);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get a single flower
const getFlower = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such flower' });
    }

    const flower = await Flower.findById(id);
    if (!flower) {
        return res.status(404).json({ error: 'No such flower' });
    }

    res.status(200).json(flower);
};

// Create a new flower
// const createFlower = async (req, res) => {
//     console.log(" Incoming POST Request to /api/flowers");
//     console.log(" Request Body:", req.body); 
//     console.log(" Uploaded Image:", req.file || req.files); 

//     const { name, description, price, category } = req.body;

//     if (!name || !description || !price || !category) {
//         console.log(" Missing Fields!"); 
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     try {
//         const flower = await Flower.create({
//             name,
//             description,
//             price,
//             category,
//             image: req.files?.image ? req.files.image[0].path : null
//         });
//         console.log(" Flower Saved to Database:", flower); // Debugging
//         res.status(201).json(flower);
//     } catch (error) {
//         console.error(" Database Error:", error.message);
//         res.status(400).json({ error: error.message });
//     }
// };


const createFlower = async (req, res) => {
    console.log("Incoming POST Request to /api/flowers");
    console.log("Uploaded file info:", req.file);

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
        return res.status(400).json({ error: "All fields are required, including image" });
    }

    try {
        // Use the Cloudinary URL from req.file.path
        const flower = await Flower.create({
            name,
            description,
            price,
            category,
            image: req.file.path, // Use the Cloudinary URL directly
        });

        console.log("Flower saved:", flower);
        res.status(201).json(flower);
    } catch (error) {
        console.error("Error saving flower:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a flower
const deleteFlower = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such flower" });
    }

    const flower = await Flower.findOneAndDelete({ _id: id });

    if (!flower) {
        return res.status(400).json({ error: "No such flower" });
    }

    res.status(200).json(flower);
};

// Update a flower
const updateFlower = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such flower" });
    }

    try {
        const updatedFlower = await Flower.findByIdAndUpdate(
            id,
            { ...req.body, image: req.file ? req.file.path : undefined }, // Update image if a new one is uploaded
            { new: true, runValidators: true }
        );

        if (!updatedFlower) {
            return res.status(404).json({ error: "No such flower" });
        }

        res.status(200).json(updatedFlower);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getFlower,
    getFlowers,
    createFlower,
    deleteFlower,
    updateFlower
};
