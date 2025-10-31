const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser')

router.get('/', checkUser, userController.loadIndex);

module.exports = router;