const model = require('../model/todoModel');
const userModel = require('../model/userModel');
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

        const todos = await model.getTodosByList(userId, list); // todo: if list equals to allTodos, return all

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

exports.addTodoGet = async (req, res) => {
    const userId = req.user.id;
    const lists = await model.getAllLists(userId);
    const user = await userModel.getUserById(userId);

    res.render('user/dashboard', { page: 'addTodo', lists: lists, user: user });
}

exports.addTodoPost = async (req, res) => {
    const userId = req.user.id;
    const { title, description, priority, due_date, list } = req.body;

    try {
        const result = await model.insertTodo({
            user_id: userId,
            title,
            description,
            status: 'pending',
            priority,
            due_date,
            list
        });

        if (!result) {
            return res.status(400).json({ success: false, message: 'Todo could not be created.' });
        }

        return res.status(200).json({ success: true, todo: result });
    } catch (err) {
        console.error(`Error while inserting todo to db. Error: ${err}`);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

exports.removeTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await model.removeTodo(id);

        if (result.rowCount === 0) {
            console.log(`Todo with id ${id} not found`);
            return res.status(404).send('Todo not found');
        }

        console.log(`Todo ${id} marked as deleted`);
        return res.redirect('/user/my-todos');
    } catch (err) {
        console.error(`Error while removing todo from db. Error: ${err}`);
        return res.status(500).send('Internal Server Error');
    }
}

exports.updateTodoGet = async (req, res) => {
    const { id } = req.params; // incoming todo_id on url
    const userId = req.user.id;
    const todo = await model.getTodoById(id);
    const lists = await model.getAllLists(userId);
    const user = await userModel.getUserById(userId);

    return res.render('user/dashboard', { page: 'updateTodo', lists: lists, user: user, todo: todo });
}

exports.updateTodoPost = async (req, res) => {
    const { title, description, priority, due_date, list } = req.body;
    const { id } = req.params;

    const userId = req.user.id;

    try {
        const response = await model.updateTodo(id, userId, title, description, priority, due_date, list);

        return res.status(200).json({ 'status': 'ok' });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(400);
    }
}