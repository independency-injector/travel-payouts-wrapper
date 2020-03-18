require('dotenv').config()
const joi = require('joi');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');


const User = {
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
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}

const generateToken = function(user) {
    const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_PRIVATE_KEY);
    return token;
}

function validateUser(user) {
    const schema = {
        name: joi.string().min(2).max(50).required(),
        email: joi.string().required().email(),
        password: joi.string().min(5).max(255).required(),
        isAdmin: joi.boolean()
    }
    return joi.validate(user, schema);
}

/* try{
    sequelize.sync();
    console.log('Models sync`d!');
} catch(err){
    console.log('An error occured while sync`ing models:' + err);
}
 */

exports.User = User;
exports.generateToken = generateToken;
exports.validate = validateUser;      