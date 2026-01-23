const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Collection',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoiceId: {
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
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}