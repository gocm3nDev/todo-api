const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const jwtMiddleware = require('../middlewares/jwt_middleware');

// Route for handle AJAX parametered request, the diff between userRouter endpoint it returns todos categorized by lists
router.get('/my-todos', jwtMiddleware, todoController.getAllTodosByList);

module.exports = router;