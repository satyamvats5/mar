const Sequelize = require('sequelize');
const conn = require('../../util/database/db_connect');

const College = conn.define('student', {
    reg_no: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: false,
    },
    roll_no: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_sem: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
}, {timestamps : true}, {underscored: true});

module.exports = College;