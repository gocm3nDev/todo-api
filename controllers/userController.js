const express = require('express');
const app = express();
const model = require('../model/userModel');
const hasher = require('../public/scripts/hasher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const inputModel = require('../public/scripts/inputModel');

dotenv.config();
app.use(express.json());

// User registeration processes
exports.registerUserGet = async (req, res) => {
    res.render('register');
};

exports.registerUserPost = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed_password = await hasher.hashPassword(password);
        await model.registerUser(username, email, hashed_password);
        res.status(200).json({ 'status': 'successful' });
    } catch (err) {
        console.log(`User insertion error. Error: ${err}`);
        res.status(500);
    }
}

// User sign in processes
exports.signinUserGet = async (req, res) => {
    res.render('signin');
}

exports.signinUserPost = async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await model.getUserByUsername(username);

        if (!foundUser) return res.status(401).json({ res: 'Invalid' });

        const isMatch = await hasher.comparePassword(password, foundUser.password_hash);
        if (!isMatch) return res.status(401).json({ res: 'Invalid' });

        const payload = { id: foundUser.id, username: foundUser.username };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 604800000, // 1w
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect('/user/profile');
    } catch (err) {
        console.log(`User sign in error. Error: ${err}`);
        res.status(500).json({ res: 'I.S.E.' });
    }
};


exports.openProfile = async (req, res) => {
    const userId = req.user.id;
    const user = await model.getUserById(userId);

    if (!user) { return res.status(404).json({ res: 'User not found' }) }

    res.render('user/dashboard', { user: user });
}

exports.logOut = async (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
        secure: process.env.NODE_ENV === 'production'
    });

    res.redirect('/');
}

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