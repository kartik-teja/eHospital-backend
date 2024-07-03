'use strict';

const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    Orders.init(
        {
            id: INTEGER,
            address: DataTypes.String,
            status: DataTypes.String,
            userId: INTEGER,
        },
        {
            sequelize,
            modelName: 'Orders',
        },
    );

    return Orders;
};