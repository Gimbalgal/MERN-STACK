
// const express = require('express');
// const mongoose = require('mongoose');
// const {
//     createFlower,
//     getFlower,
//     getFlowers,
//     deleteFlower,
//     updateFlower
// } = require('../controllers/flowerController');

// const Flower = require('../models/flowerModel')


// // get all flowers
// const getFlowers = async (req, res) => {
//     const flowers = await flower.find({}).sort({createdAt: -1})
//     res.status(200).json(flowers)
// }

// // Get a single flower
// const getFlower = async(req, res) =>{
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(400).json({error: "No such flower"})
//     }
//     const Flower = await flower.findById(id)
// if(!flower)
//     return res.status(400).json({error: "No such flower"})

// res.status(200).json(flower)
// }


// // Create a new flower
// const createFlower = async (req, res) => {
    
//     console.log("Incoming POST Request to /api/flowers");
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Image:", req.file);

//     const { name, description, price, category } = req.body;

//     if (!name || !description || !price || !category) {
//         console.log("Missing Fields!");
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // If no image is uploaded, return an error
//     if (!req.file) {
//         return res.status(400).json({ error: "Image is required" });
//     }

//     // Create the new flower document, including the image buffer
//     try {
//         const flower = await Flower.create({
//             name,
//             description,
//             price,
//             category,
//             image: {
//                 data: req.file.buffer,       // Image data stored in buffer
//                 contentType: req.file.mimetype  // Image content type
//             }
//         });
//         console.log("Flower Saved to Database:", flower); // Debugging

//         const imageUrl = `${req.protocol}://${req.get('host')}/image/${flower._id}`;

//         // Return the flower with the image URL
//         res.status(201).json({
//             message: 'Flower created successfully!',
//             flower: {
//                 ...flower.toObject(),
//                 imageUrl: imageUrl // Provide the image URL
//             }
//         });
//     } catch (error) {
//         console.error("Database Error:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// const deleteFlower = async (req, res) =>{
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(400).json({error: "No such flower"})
//     }
//     const flower = await flower.findOneAndDelete({_id: id})
// }

// const flower = await Flower.findByIdAndUpdate({_id: id}, {...req.body})
// if(!flower){
//     return res.status(400).json({error: "No such flower"})

//     res.status(200).json(flower)
// }

// module.exports = {
//     getFlower,
//     getFlowers,
//     createFlower,
//     deleteFlower,
//     updateFlower
// };

const mongoose = require('mongoose');
const express = require('express');

const Flower = require('../models/flowerModel');

// GET all flowers
const getFlowers = async (req, res) => {
    const flowers = await Flower.find({}).sort({ createdAt: -1 });
    res.status(200).json(flowers);
};

// GET a single flower
const getFlower = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such flower" });
    }
    const flower = await Flower.findById(id);
    if (!flower) {
        return res.status(400).json({ error: "No such flower" });
    }
    res.status(200).json(flower);
};

// CREATE a new flower
const createFlower = async (req, res) => {
    console.log("Incoming POST Request to /api/flowers");
    console.log("Request Body:", req.body);
    console.log("Uploaded Image:", req.file);

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
    }

    try {
        const flower = await Flower.create({
            name,
            description,
            price,
            category,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        const imageUrl = `${req.protocol}://${req.get('host')}/image/${flower._id}`;

        res.status(201).json({
            message: 'Flower created successfully!',
            flower: {
                ...flower.toObject(),
                imageUrl: imageUrl
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a flower
const deleteFlower = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such flower" });
    }

    const flower = await Flower.findOneAndDelete({ _id: id });

    if (!flower) {
        return res.status(400).json({ error: "No such flower" });
    }

    res.status(200).json({ message: "Flower deleted successfully", flower });
};

// UPDATE a flower
const updateFlower = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such flower" });
    }

    try {
        const flower = await Flower.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!flower) {
            return res.status(400).json({ error: "No such flower" });
        }

        res.status(200).json(flower);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getFlowers,
    getFlower,
    createFlower,
    deleteFlower,
    updateFlower
};
