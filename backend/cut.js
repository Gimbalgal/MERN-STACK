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



