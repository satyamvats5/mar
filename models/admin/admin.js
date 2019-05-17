const Sequelize = require('sequelize');
const conn = require('../../util/database/db_connect');

const Admin = conn.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.BIGINT,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
}, {timestamps : true}, {underscored: true});

module.exports = Admin;