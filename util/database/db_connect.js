const sequelize = require('sequelize');

const dbconfig = require('../../config/database/databaseConfig');

const sequelize_connection = new sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    operatorsAliases: false,
});

module.exports = sequelize_connection;