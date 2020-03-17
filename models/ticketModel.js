require('dotenv').config(); //detele this
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    dialect: "postgres",
    host: "127.0.0.1"
});

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
    sequelize.sync().then(result => {
        console.log("Connected to db and sync`d");
    })
    .catch(err => {
        console.log("Something failed during DB connection" + err);
    });

    const addTicket = async(ticket) => {
        
    }