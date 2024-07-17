'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');
const AppointmentsModel = require('../models/Appointment');

let sequelize;
let Appointments;

beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    Appointments = AppointmentsModel(sequelize);

    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
});

describe('Appointments Model', () => {
    it('should create an appointment', async () => {
        const appointment = await Appointments.create({
            time: 1627843620,
            doctorid: 33,
            patientid: 42,
            status: 'pending',
        });

        expect(appointment).toBeDefined();
        expect(appointment.time).toBe(1627843620);
        expect(appointment.doctorid).toBe(33);
        expect(appointment.patientid).toBe(42);
        expect(appointment.status).toBe('pending');
    });

    it('should not create an appointment with an invalid status', async () => {
        await expect(
            Appointments.create({
                time: 1627843620,
                doctorid: 33,
                patientid: 42,
                status: 'invalid_status',
            })
        ).rejects.toThrow();
    });

    it('should read an appointment', async () => {
        const appointment = await Appointments.create({
            time: 1627843620,
            doctorid: 33,
            patientid: 42,
            status: 'pending',
        });

        const foundAppointment = await Appointments.findOne({ where: { id: appointment.id } });
        expect(foundAppointment).toBeDefined();
        expect(foundAppointment.time).toBe(1627843620);
    });

    it('should update an appointment status', async () => {
        const appointment = await Appointments.create({
            time: 1627843620,
            doctorid: 33,
            patientid: 42,
            status: 'pending',
        });

        appointment.status = 'accepted';
        await appointment.save();

        const updatedAppointment = await Appointments.findOne({ where: { id: appointment.id } });
        expect(updatedAppointment.status).toBe('accepted');
    });

    it('should delete an appointment', async () => {
        const appointment = await Appointments.create({
            time: 1627843620,
            doctorid: 33,
            patientid: 42,
            status: 'pending',
        });

        await Appointments.destroy({ where: { id: appointment.id } });

        const deletedAppointment = await Appointments.findOne({ where: { id: appointment.id } });
        expect(deletedAppointment).toBeNull();
    });
});
