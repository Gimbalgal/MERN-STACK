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
    
    image: { 
        data: Buffer, 
        contentType: String 
    }
}, { timestamps: true});



module.exports = mongoose.model('Flower', flowerSchema)