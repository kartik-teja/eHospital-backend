const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
//const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
//const { Users, Courses, Chapters } = require('./models/');
//const users = require('./models/users');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'looks')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/login', (request, response) => {
    response.render('login')
})

app.get('/signup', (request, response) => {
    response.render('login')
})

module.exports = app;
