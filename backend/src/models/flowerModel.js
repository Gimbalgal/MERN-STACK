const mongoose = require('mongoose');

const Schema = mongoose.Schema

const flowerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    // image: { type: mongoose.Schema.Types.ObjectId, ref: "ImageModel" } 
    
    image: { 
        type: String, 
        required: true 
    }
}, { timestamps: true});


const Flower = mongoose.model("Flower", flowerSchema);
module.exports = Flower;


