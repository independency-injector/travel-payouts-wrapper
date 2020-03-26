const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT} = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: DB_DIALECT
});

const User = require('../models/user')(sequelize, Sequelize);
const Ticket = require('../models/ticket')(sequelize, Sequelize);

module.exports = {
    Sequelize,
    sequelize,
    User
}