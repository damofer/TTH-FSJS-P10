'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');

const homeRoute = require('./routes');
const booksRoute = require('./routes/books');
const loansRoute = require('./routes/loans');
// const patronsRoute = require('./routes/patrons');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/books', booksRoute);
app.use('/loans', loansRoute);
// app.use('/patrons', patronsRoute);



app.listen(3000, function() {

	console.log("The frontend server is running on port 3000!");



});
module.exports = app;