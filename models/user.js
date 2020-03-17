require('dotenv').config()
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const userSchema = {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,   
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        
    },
    isAdmin: Sequelize.BOOLEAN
}

const generateToken = function(user) {
    const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_PRIVATE_KEY);
    return token;
}
const User = new Sequelize.define("user", userSchema);

exports.User = User;
exports.generateToken = generateToken;