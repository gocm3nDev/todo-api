const model = require('../model/todoModel');
const express = require('express');
const app = express();

exports.getAllTodos = async (req, res) => {
    try{
        const todos = await model.getAllTodos();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error while fetching all todos' });
    }
}



