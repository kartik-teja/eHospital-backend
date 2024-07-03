const Sequelize = require('sequelize');

const database = 'mydb';
const username = 'postgres';
const password = 'password';
const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
});

const connect = async () => {
    return sequelize.authenticate();
};

module.exports = {
    connect,
    sequelize,
};