'use strict';

const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    Patients.init(
        {
            id: INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Patients',
        },
    );

    return Patients;
};