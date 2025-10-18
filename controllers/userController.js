const express = require('express');
const app = express();
const model = require('../model/userModel');
const hasher = require('../scripts/hasher');

exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const hashed_password = await hasher.hashPassword(password);
    await model.registerUser(username, email, hashed_password);
    res.render('index');
}