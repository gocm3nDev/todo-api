const express = require('express');
const app = express();
const model = require('../model/userModel');
const hasher = require('../public/scripts/hasher');
const inputModel = require('../public/scripts/inputModel');

exports.registerUserGet = async (req, res) => {
    res.render('register');
};

exports.registerUserPost = async (req, res) => {
    const { username, email, password } = req.body;
    const hashed_password = await hasher.hashPassword(password);
    await model.registerUser(username, email, hashed_password);
    res.render('index');
};

exports.checkUsername = async (req, res) => {
    const { username } = req.body;

    try {
        const isTaken = await inputModel.checkUsername(username);
        return res.json({ isTaken: isTaken });
    } catch (err) {
        console.log(`An error occured while checking if username exists in db. please check the userController. Error: ${err}`);
        res.status(500).json({ 'error': err });
    }
};

exports.checkEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const isTaken = await inputModel.checkEmail(email);
        return res.json({ isTaken: isTaken });
    } catch (err) {
        console.log(`An error occured while checking if email exists in db. please check the userController. Error: ${err}`);
        res.status(500).json({ 'error': err });
    }
};