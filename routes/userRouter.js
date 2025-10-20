const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.registerUserGet);
router.post('/register', userController.registerUserPost);

// endpoints to check input data
router.post('/check-username', userController.checkUsername);
router.post('/check-email', userController.checkEmail);


module.exports = router;