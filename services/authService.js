const { User } = require('../models/index');
const { to, throwError } = require('../util/requestHelper');
const { JWT_ENCRYPTION, JWT_EXPIRES } = process.env;
const jwt = require('jsonwebtoken');

const generateTokens = ({}) => {

};

const verifyToken = token => {
    try {
        return jwt.verify(token, JWT_ENCRYPTION);
    }
    catch(ex){
        throwError(ex.message, true);
    };
};
