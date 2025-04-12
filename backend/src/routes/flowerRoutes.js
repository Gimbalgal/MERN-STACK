
const express = require('express')
const {
    createFlower,
    getFlower,
    getFlowers,
    deleteFlower,
    updateFlower
} = require('../controllers/flowerController');

const upload = require('../../Image/imageMulter');


const router = express.Router();

//  GET all flowers
router.get('/', getFlowers);

//  GET a single flower by ID
router.get('/:id', getFlower); 


//  CREATE a new flower with image
router.post(
    '/',
    upload.single('image'), 
    createFlower
);

//  UPDATE flower with optional image
router.patch('/:id', upload.single('image'), updateFlower);

//  DELETE flower
router.delete('/:id', deleteFlower);

module.exports = router;
