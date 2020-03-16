const sequelize = require('sequelize');

const Ticket = sequelize.define("ticket", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    origin: {
        type: sequelize.STRING,
        allowNull: false,
        len: [2,3]
    },
    destination: {
        type: sequelize.STRING,
        allowNull: false,
        len: [2,3]
    },
    depart_date: {
        type: sequelize.DATE,
        allowNull: false,
    },
    return_date: {
        type: sequelize.DATE,
        allowNull: false
    },
    price: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    airline: {
        type: sequelize.STRING,
        allowNull: false
    },
    flight_number: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});