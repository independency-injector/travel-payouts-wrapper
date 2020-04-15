const { User } = require('../models/index');
require('dotenv').config();
const {to, throwError} = require('../util/requestHelper');
const { JWT_ENCRYPTION, JWT_EXPIRATION } = process.env;
const jwt = require('jsonwebtoken');

const generateTokens = ({id, email}) => {
    const access_token = jwt.sign({user_id: id}, JWT_ENCRYPTION, {expiresIn: 3600});
    const refresh_token = jwt.sign({user_id: id, user_email: email}, JWT_ENCRYPTION, { expiresIn: JWT_EXPIRATION});
     User.findOne( { where: { email: email} }).then((user) => {
        user.refresh_token = refresh_token;
        user.save();
    }); 
    return {
        access_token,
        refresh_token
    };
};

const verifyToken = token => {
    try {
        return jwt.verify(token, JWT_ENCRYPTION);
    } catch(ex){
        throwError(ex.message, true);
    }
};


const register = async userInfo => {
    let [err, newUser] = await to(User.create({username: userInfo.username, email: userInfo.email, password: userInfo.password}));
    if(err) throwError(err.message);
    return newUser;
};

const login = async userInfo => {
    let [err, user] = await to(User.findOne( { where: { email: userInfo.email} } ));
    if(err) throwError(err.message);
    if(user == null) throwError('Not registered!');
    const pass = await user.validatePassword(userInfo.password);
    if(!pass) throwError('Wrong password!');
    const tokens = generateTokens({id: user.id, email: user.email});
    return Object.assign({
        username: user.username,
        email: user.email
    }, tokens);
};

module.exports = {
    register,
    login,
    verifyToken
}
