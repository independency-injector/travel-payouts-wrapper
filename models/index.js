const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT } = process.env;
let db = {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: DB_DIALECT,
    port: DB_PORT
});

db.User = require('../models/user')(sequelize, Sequelize);
db.Ticket = require('../models/ticket')(sequelize, Sequelize);

db.User.assosiate(db.Ticket);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;