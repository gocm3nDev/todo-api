const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server is running on 3000.');
});