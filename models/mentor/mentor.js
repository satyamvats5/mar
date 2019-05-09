const Sequelize = require('sequelize');
const conn = require('../../util/database/db_connect');

const Mentor = conn.define('mentor', {
    mentor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
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

module.exports = Mentor;