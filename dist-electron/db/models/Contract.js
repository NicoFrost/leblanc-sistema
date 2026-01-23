const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Contract', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        buildingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Buildings', // nombre de la tabla destino (asegúrate que coincide)
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Employees',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        hoursPerDay: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        hourlyRate: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        days: {
            type: DataTypes.STRING,
            allowNull: false
        },
        initialDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
}