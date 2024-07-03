'use strict';

const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    Appointments.init(
        {
            id: INTEGER,
            time: INTEGER,
            doctorid: INTEGER,
            patientid: INTEGER,
        },
        {
            sequelize,
            modelName: 'Appointments',
        },
    );

    return Appointments;
};