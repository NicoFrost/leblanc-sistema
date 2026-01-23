const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Method',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}