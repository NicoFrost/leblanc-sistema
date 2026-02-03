const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Salary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        period: {
            type: DataTypes.STRING, // Ej. "2026-01" para enero 2026
            allowNull: false
        },
        grossAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
};