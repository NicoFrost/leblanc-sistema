const { Sequelize } = require('sequelize');
const path = require('path');
const { app } = require('electron');

// En desarrollo usa __dirname, en producción usa userData
const dbPath = process.env.NODE_ENV === 'development' 
  ? path.join(__dirname, 'database.sqlite')
  : path.join(app.getPath('userData'), 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

async function initDB() {
  try {
    await sequelize.query('PRAGMA foreign_keys = ON;');
    
    // Importar modelos
    const Employee = require('./models/Employee')(sequelize);
    const User = require('./models/User')(sequelize);
    const Expense = require('./models/Expense')(sequelize);
    const Contract = require('./models/Contract')(sequelize);
    const Building = require('./models/Building')(sequelize);
    const Collection = require('./models/Collection')(sequelize);
    const Invoice = require('./models/Invoice')(sequelize);
    const Method = require('./models/Method')(sequelize);
    const Salary = require('./models/Salary')(sequelize);
    const Payment = require('./models/Payment')(sequelize);

    // Definir relaciones
    Employee.hasMany(Contract, { foreignKey: 'employeeId' });
    Contract.belongsTo(Employee, { foreignKey: 'employeeId' });

    Building.hasMany(Contract, { foreignKey: 'buildingId' });
    Contract.belongsTo(Building, { foreignKey: 'buildingId' });

    Building.hasMany(Invoice, { foreignKey: 'buildingId' });
    Invoice.belongsTo(Building, { foreignKey: 'buildingId' });

    Invoice.hasMany(Collection,{foreignKey: 'invoiceId'});
    Collection.belongsTo(Invoice,{foreignKey: 'invoiceId'})

    Collection.belongsTo(Method,{foreignKey: 'methodId'});
    Method.hasMany(Collection,{foreignKey: 'methodId'})
   
    Salary.belongsTo(Employee, { foreignKey: 'employeeId' });
    Employee.hasMany(Salary, { foreignKey: 'employeeId' });

    Payment.belongsTo(Salary, { foreignKey: 'salaryId' });
    Salary.hasMany(Payment, { foreignKey: 'salaryId' });

    // Employee.hasMany(Expense, { foreignKey: 'employeeId' });
    // Expense.belongsTo(Employee, { foreignKey: 'employeeId' });

    // Building.hasMany(Expense, { foreignKey: 'buildingId' });
    // Expense.belongsTo(Building, { foreignKey: 'buildingId' });

    await sequelize.sync(); // o sync({ alter: true }) según necesites
    console.log('Database synced');
    return {sequelize, User, Employee, Expense, Contract, Building, Collection, Invoice, Method,Salary, Payment };
  } catch (err) {
    console.error('DB sync error:', err);
    process.exit(1);
  }
}


// module.exports = { initDB, sequelize, User, Employee, Expense, Contract, Building };
module.exports = { initDB, sequelize };
