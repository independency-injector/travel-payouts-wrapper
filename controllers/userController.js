const {User} = require('../models/index');
const {to, error, throwError, success} = require('../util/requestHelper');

const register = (req, res) => {
    res.json({
        message: 'Create new users'
    });
};

const deleteUser = (req, res) => {
    // protect this with admin-like user
    res.json({
        message: 'Delete existing user'
    });
};

const getUser = (req, res) => {
    // later on this will implement login logic as we dont need to get users directly
    res.json({
        message: 'Get existing user'
    });
};

module.exports = {
    register,
    getUser,
    deleteUser
};