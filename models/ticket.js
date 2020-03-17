const Sequelize = require('sequelize');
const joi = require('joi');

const Ticket =  {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [2,3]
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [2,3]
    },
    depart_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    return_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    airline: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flight_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};
    function validateTicket(ticket) {
        const schema = {
            origin: joi.string().min(2).max(3).required(),
            destination: joi.string().min(2).max(3).required(),
            depart_date: joi.date().required(),
            return_date: joi.date().required(),
            price: joi.number().required(),
            airline: joi.string().required(),
            flight_number: joi.number().required()
        }
        return joi.validate(ticket, schema);
    }
    module.exports = Ticket;
    module.exports = validateTicket;