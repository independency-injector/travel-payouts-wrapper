const {User} = require('../models/index');
const {to, error, throwError, success} = require('../util/requestHelper');


module.exports = {
    register,
    login,
    logout
};