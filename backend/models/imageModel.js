const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,  
        contentType: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const ImageModel = mongoose.model('ImageModel', imageSchema);

module.exports = ImageModel;