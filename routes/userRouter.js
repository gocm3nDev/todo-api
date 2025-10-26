const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registeration routings
router.get('/register', userController.registerUserGet);
router.post('/register', userController.registerUserPost);

// Sign in routings
router.get('/sign-in', userController.signinUserGet);
router.post('/sign-in', userController.signinUserPost);

// endpoints to check input data
router.post('/check-username', userController.checkUsername);
router.post('/check-email', userController.checkEmail);


module.exports = router;