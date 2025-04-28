
const express = require('express')
const {
    createFlower,
    getFlower,
    getFlowers,
    deleteFlower,
    updateFlower
} = require('../controllers/flowerController');

const cloudinary = require('../../utils/cloudinary');

const upload = require('../../middleware/multer'); 

const router = express.Router();

//  GET all flowers
router.get('/', getFlowers);

//  GET a single flower by ID
router.get('/:id', getFlower); 

router.post('/', upload.single('image'), createFlower);



// CREATE a new flower with an image
// router.post(
//     "/",
//     upload.fields([{ name: "image", maxCount: 1 }]), 
//     createFlower
// );

//  UPDATE flower with optional image
router.patch('/:id', upload.single('image'), updateFlower);

//  DELETE flower
router.delete('/:id', deleteFlower);

module.exports = router;
