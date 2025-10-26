const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

exports.hashPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 12;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.log(err);
        return `Error: ${err}`;
    }
}

exports.comparePassword = async (plain, hash) => {
    try {
        return await bcrypt.compare(plain, hash);
    } catch (err) {
        console.log(err);
        return `Error: ${err}`;
    }
}
