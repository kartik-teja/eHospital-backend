const express = require('express');
const app = express();
const path = require('path');
const join = path.join;
const { json, urlencoded } = require('body-parser');

const Sequelize = require('sequelize');
//const model = require('./models');
//const appointment = model.Appointment
const Doctors = require('./models/Doctors');
const Patients = require('./models/Patients')

app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'views')));
app.use(express.static(join(__dirname, 'public')));
app.use(json());
app.use(urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup/doctor', async (req, res) => {
    console.log(req.body);
    try {
        const newDoctor = await Doctors.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log('New doctor created:', newDoctor.toJSON());
        res.redirect('/login');

    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/signup/patient', async (req, res) => {
    console.log(req.body);
    try {
        const newPatient = await Patients.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log('New patient created:', newPatient.toJSON());
        res.redirect('/login');

    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctors.findOne({ where: { email } });
        if (doctor && await doctor.comparePassword(password)) {
            // login successful, redirect to doctor dashboard
            res.redirect('/doctor/dashboard');
        } else {
            const patient = await Patients.findOne({ where: { email } });
            if (patient && await patient.comparePassword(password)) {
                // login successful, redirect to patient dashboard
                res.redirect('/patient/dashboard');
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;
