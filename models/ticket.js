require('dotenv').config(); //detele this
const Sequelize = require('sequelize');
const joi = require('joi');
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    dialect: "postgres",
    host: "127.0.0.1"
}); // this one goes to startup folder

const Ticket = sequelize.define("ticket", {
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
});
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
    /*
    sequelize.sync().then(result => {
        console.log("Connected to db and sync`d");
    })
    .catch(err => {
        console.log("Something failed during DB connection" + err);
    });

*/
    module.exports = Ticket;
    module.exprots = validateTicket;