// File upload endpoint
app.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error uploading file", error: err });
        }
        // if (!req.file) {
        //     return res.status(400).json({ message: "No file uploaded" });
        // }
        console.log('req.files', req.files.testImage)
        try {
            const newImage = new ImageModel({
                name: req.files.testImage.originalname,  
                image: {
                    data: req.files.testImage.path,  // Store file path instead of binary buffer
                    contentType: req.files.testImage.mimetype
                }
            });

            await newImage.save();
            res.status(201).json({ message: "Image uploaded successfully", file: req.file });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Database error", error });
        }
    });
});



reserved

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false})


// static signup method


userSchema.statics.signup = async function( name, email, password) {
    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user
}



module.exports = mongoose.model('User', userSchema)