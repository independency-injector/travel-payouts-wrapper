const Sequelize = require('sequelize');
const User = require('../models/user');
module.exports = () => {
const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USER}`,`${process.env.DB_PASSWORD}`, {
    host: "localhost",
    dialect: "postgres"
});

try {
 sequelize.authenticate();
 console.log('Connected to DB!');
} catch(err){
    console.log('An error occured while connecting to DB:' + err);
}}