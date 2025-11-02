const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const jwtMiddleware = require('../middlewares/jwt_middleware');

// Route for handle AJAX parametered request, the diff between userRouter endpoint it returns todos categorized by lists
router.get('/my-todos', jwtMiddleware, todoController.getAllTodosByList);

// Todo insertion routings
router.get('/add-todo', jwtMiddleware, todoController.addTodoGet);
router.post('/add-todo', jwtMiddleware, todoController.addTodoPost);

// Todo remove endpoint
router.get('/remove-todo/:id', jwtMiddleware, todoController.removeTodo);

// Todo update endpoints
router.get('/update-todo/:id', jwtMiddleware, todoController.updateTodoGet);

module.exports = router;