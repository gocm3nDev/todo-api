const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const jwtMiddleware = require('../middlewares/jwt_middleware');
const checkUser = require('../middlewares/checkUser')

// Registeration routings
router.get('/register', checkUser, userController.registerUserGet);
router.post('/register', userController.registerUserPost);

// Sign in routings
router.get('/sign-in', checkUser, userController.signinUserGet);
router.post('/sign-in', userController.signinUserPost);

// endpoints to check input data
router.post('/check-username', userController.checkUsername);
router.post('/check-email', userController.checkEmail);

// Log in - Log out routings
router.get('/dashboard', jwtMiddleware, userController.openProfile);
router.post('/log-out', userController.logOut);

// show all todos related by user
router.get('/my-todos', jwtMiddleware, todoController.getAllTodos);

module.exports = router;