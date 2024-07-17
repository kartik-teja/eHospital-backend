'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');
const PatientsModel = require('../models/Patients');

let sequelize;
let Patients;

beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    Patients = PatientsModel(sequelize);

    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
});

describe('Patients Model', () => {
    it('should create a patient', async () => {
        const patient = await Patients.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
        });

        expect(patient).toBeDefined();
        expect(patient.name).toBe('John Doe');
        expect(patient.email).toBe('john.doe@example.com');
        expect(patient.password).toBe('securepassword');
    });

    it('should not create a patient with an invalid email', async () => {
        await expect(
            Patients.create({
                name: 'Jane Doe',
                email: 'invalidemail',
                password: 'securepassword',
            })
        ).rejects.toThrow();
    });

    it('should read a patient', async () => {
        const patient = await Patients.findOne({ where: { email: 'john.doe@example.com' } });
        expect(patient).toBeDefined();
        expect(patient.name).toBe('John Doe');
    });

    it('should update a patient', async () => {
        const patient = await Patients.findOne({ where: { email: 'john.doe@example.com' } });
        patient.name = 'John A. Doe';
        await patient.save();

        const updatedpatient = await Patients.findOne({ where: { email: 'john.doe@example.com' } });
        expect(updatedpatient.name).toBe('John A. Doe');
    });

    it('should delete a patient', async () => {
        await Patients.destroy({ where: { email: 'john.doe@example.com' } });

        const deletedpatient = await Patients.findOne({ where: { email: 'john.doe@example.com' } });
        expect(deletedpatient).toBeNull();
    });
});
