const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
});

// Importar modelos
const User = require('./models/User')(sequelize);

sequelize.sync();

module.exports = { sequelize, User };
