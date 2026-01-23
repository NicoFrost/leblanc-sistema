const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salaryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        methodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('advance', 'full', 'partial'), // Opcional: para distinguir adelantos
            allowNull: true
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};