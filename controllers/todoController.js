const model = require('../model/todoModel');
const express = require('express');
const dateFormatter = require('../public/scripts/dateFormatter');
const app = express();

exports.getAllTodos = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await model.getAllTodos(userId);
        const lists = await model.getAllLists(userId);

        const formattedTodos = todos.map(todo => {
            return {
                ...todo,
                created_at: dateFormatter.formatDate(todo.created_at)
            };
        });

        res.render('user/dashboard', {
            page: 'todos',
            todos: formattedTodos,
            lists: lists,
            user: req.user
        });

    } catch (err) {
        console.error("Err in controller: ", err.message);
        res.status(500).json({ message: 'Internal server error while fetching all todos' });
    }
}

exports.getAllTodosByList = async (req, res) => {
    try {
        const userId = req.user.id;
        const list = req.query.filter || 'allTodos';

        const todos = await model.getTodosByList(userId, list);

        const formattedTodos = todos.map(todo => {
            return {
                ...todo,
                created_at: dateFormatter.formatDate(todo.created_at)
            };
        });

        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            return res.render('user/list-todos', { todos: formattedTodos });
        }

        const lists = await model.getAllLists(userId);

        return res.render('user/dashboard', {
            page: 'todos',
            todos: todos,
            lists: lists,
            activeList: list
        });
    } catch (err) {
        console.error(`Error while getting todos by list: ${err}`);
        return res.status(500).send('Internal Server Error');
    }
}

