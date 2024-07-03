'use strict';

const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    Doctors.init(
        {
            id: INTEGER,
            name: DataTypes.STRING,
            specialisation: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Doctors',
        },
    );

    return Doctors;
};