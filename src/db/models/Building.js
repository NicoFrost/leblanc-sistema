const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Building', {  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        buildingName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cleanArticles: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "R" // R: Recibo, A: Factura A, B: Factura B
        },
        coordX: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        coordY: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
}