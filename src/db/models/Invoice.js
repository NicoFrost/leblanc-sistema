const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Invoice',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        buildingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        settlementDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        settled: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}