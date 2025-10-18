const express = require('express');
const app = express();
const userController = require('./controllers/userController');

app.use('/user', userController);

app.listen(3000, () => {
    console.log('Server is running on 3000.');
});