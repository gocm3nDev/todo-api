const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');
const todoRouter = require('./routes/todoRouter');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/todo', todoRouter);

app.listen(3000, () => {
    console.log('Server is running on 3000.');
});