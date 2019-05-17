const Sequelize = require('sequelize');
const conn = require('../../util/database/db_connect');

const Mentor = conn.define('mentor', {
    mentor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: 1,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    department: {
        type: Sequelize.ENUM,
        values: ['CSE', 'IT', 'MECHANICAL', 'CIVIL', 'CHEMICAL', 'FIBER', 'JUTE'],
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.BIGINT,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {timestamps : true}, {underscored: true});


module.exports = Mentor;