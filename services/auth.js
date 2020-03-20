const {User} = require('../models');
const { to, throwError } = require('../util/requestHelper');
const {JWT_ENCRYPTION, JWT_EXPIRATION} = process.env;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateTokens = ( {id, email} ) => {
    const access_token = jwt.sign({user_id: id}, JWT_ENCRYPTION, {expiresIn: 3600});
    const refresh_token = jwt.sign({user_id: id, email: email}, JWT_ENCRYPTION, {expiresIn: JWT_EXPIRATION});
    User.findOne( { where: {email:email} } ).then((User) => {
        User.refresh_token = refresh_token;
        User.save();
    });
    return {
        access_token,
        refresh_token
    };
};

const verifyToken = token => {
    try{
        return jwt.verify(token, JWT_ENCRYPTION);
    } catch(ex){
        throwError(ex.message, true);
    }
}

const register = async userInfo => {
    let err, newUser;
    [err, newUser] = await to(User.create(userInfo));
    if(err) throwError(err.message);
    return newUser;
};

const login = async userInfo => {
    let user, err;
    [err, user] = await to(User.findOne( {where: {email: userInfo.email}} ));
    if(!user) throwError('Not registered!');
    [err, user] = await to(user.comparePassword(userInfo.password));
    if(err) throwError(err.message);
    const tokens = generateTokens({id: user.id, email: user.email})

    return Object.assign({
        usename: user.username,
        email: user.email
    }, tokens);
};

module.exports = {
    register,
    login,
    verifyToken
}
