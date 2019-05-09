const Sequelize = require('sequelize');
const conn = require('../../util/database/db_connect');

const College = conn.define('college', {
    college_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique:true,
        allowNull: false,
    },
    phone: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {timestamps : true}, {underscored: true});

module.exports = College;