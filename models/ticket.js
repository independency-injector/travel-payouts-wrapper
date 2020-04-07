const { throwError, to } = require('../util/requestHelper');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('ticket', {
        origin_city: DataTypes.STRING,
        destination_city: DataTypes.STRING,
        depart_date: DataTypes.DATE,
        return_date: DataTypes.DATE,
        price: DataTypes.FLOAT,
        airline_id: DataTypes.INTEGER,
        flight_number: DataTypes.INTEGER
    });

    return Model;
}