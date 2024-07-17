'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');
const DoctorsModel = require('../models/Doctors');

let sequelize;
let Doctors;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Doctors = DoctorsModel(sequelize);

  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('Doctors Model', () => {
  it('should create a doctor', async () => {
    const doctor = await Doctors.create({
      name: 'Dr. John Doe',
      specialisation: 'Cardiology',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      password: 'securepassword',
    });

    expect(doctor).toBeDefined();
    expect(doctor.name).toBe('Dr. John Doe');
    expect(doctor.specialisation).toBe('Cardiology');
    expect(doctor.email).toBe('john.doe@example.com');
    expect(doctor.phone).toBe('123-456-7890');
    expect(doctor.address).toBe('123 Main St, Anytown, USA');
    expect(doctor.password).toBe('securepassword');
  });

  it('should not create a doctor with an invalid email', async () => {
    await expect(
      Doctors.create({
        name: 'Dr. Jane Doe',
        specialisation: 'Neurology',
        email: 'invalidemail',
        phone: '123-456-7890',
        address: '456 Elm St, Anytown, USA',
        password: 'securepassword',
      })
    ).rejects.toThrow();
  });

  it('should read a doctor', async () => {
    const doctor = await Doctors.findOne({ where: { email: 'john.doe@example.com' } });
    expect(doctor).toBeDefined();
    expect(doctor.name).toBe('Dr. John Doe');
  });

  it('should update a doctor', async () => {
    const doctor = await Doctors.findOne({ where: { email: 'john.doe@example.com' } });
    doctor.name = 'Dr. John A. Doe';
    await doctor.save();

    const updatedDoctor = await Doctors.findOne({ where: { email: 'john.doe@example.com' } });
    expect(updatedDoctor.name).toBe('Dr. John A. Doe');
  });

  it('should delete a doctor', async () => {
    await Doctors.destroy({ where: { email: 'john.doe@example.com' } });

    const deletedDoctor = await Doctors.findOne({ where: { email: 'john.doe@example.com' } });
    expect(deletedDoctor).toBeNull();
  });
});
