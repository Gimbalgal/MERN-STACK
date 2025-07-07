const mongoose = require('mongoose');
const express = require('express');
const Flower = require('../models/flowerModel');
const cloudinary = require('../../utils/cloudinary');

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
    console.log("Uploaded file info:", req.file);

    const { name, description, price, category } = req.body;
    let emptyFields = [];
    if (!name) emptyFields.push("name");
    if (!description) emptyFields.push("description");
    if (!price) emptyFields.push("price");
    if (!category) emptyFields.push("category");
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields });
    }

    if (!name || !description || !price || !category || !req.file) {
        return res.status(400).json({ error: "All fields are required, including image" });
    }

    try {
        // Save the Cloudinary URL to MongoDB
        const flower = await Flower.create({
            name,
            description,
            price,
            category,
            image: req.file.path // Save the Cloudinary URL
        });

        console.log("Flower saved:", flower);
        res.status(201).json(flower);
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