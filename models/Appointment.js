// models/appointments.js
'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Appointments extends Model { }

    Appointments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            doctorid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            patientid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ['accepted', 'rejected', 'pending'],
                allowNull: false,
                validate: {
                    isIn: {
                        args: [['accepted', 'rejected', 'pending']],
                    }
                }
            },
        },
        {
            sequelize,
            modelName: 'Appointments',
        }
    );

    return Appointments;
};
