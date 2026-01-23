const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Expense', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
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
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // buildingId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'Buildings', // nombre de la tabla destino (asegúrate que coincide)
        //         key: 'id'
        //     },
        //     onDelete: 'RESTRICT',
        //     onUpdate: 'CASCADE'
        // },
        // employeeId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'Employees',
        //         key: 'id'
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE'
        // },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
}