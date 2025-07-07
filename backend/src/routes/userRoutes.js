const express = require('express');

// user controller

const {signupUser, loginUser} = require('../controllers/userController')

const router = express.Router()


// login router

router.post('/login', loginUser);

// signup router

router.post('/signup', signupUser);



module.exports = router