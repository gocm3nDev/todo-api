const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/sign-up', userController.registerUserGet);
router.post('/sign-up', userController.registerUserPost);

module.exports = router;// frontend ejs