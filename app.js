import express from 'express';
const app = express();
import { join } from 'path';
//const Sequelize = require('sequelize');
import { json, urlencoded } from 'body-parser';
//const { Users, Courses, Chapters } = require('./models/');
//const users = require('./models/users');


app.set('view engine', 'ejs');
app.use((join(__dirname, 'views')));
app.use((join(__dirname, 'looks')));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/login', (request, response) => {
    response.render('login')
})

app.get('/signup', (request, response) => {
    response.render('login')
})

export default app;
