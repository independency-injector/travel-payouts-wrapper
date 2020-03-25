const { throwError, to } = require('../util/requestHelper');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('ticket', {
        //schema
    });

    

    return Model;
}