const {User} = require('../models/index');
const {to, error, throwError, success} = require('../util/requestHelper');
const auth = require('../services/auth');

const register = async (req, res) => {
    const { body } = req;
    if(!body.username && !body.email)
        return error(res, 'Bad request: provide an username and email!', 400);
        if(!body.password)
            return error(res, 'Bad request: provide a password', 400);

        let err, user;
        [err] = await to(auth.register(body));
        if(err) return error(res, err.message, 400);
        [err, user] = await to(auth.login(body));
        console.log(user);
        return success(res, {message: 'successfully created a new user', user}, 201);
};

const login = async (req, res) => {
    const { body } = req;
    if(!body.email && !body.password) return error(res, 'Bad request: provide an username and password', 400);
    let err, user;
    [err, user] = await to(auth.login(body));
    if(err) return error(res, err.message, 400);
    return success(res, user, 200);
};

const logout = async (req, res) => {
    req.logout();
    return success(res, {message: 'Successfully logged out'}, 200);
};

module.exports = {
    register,
    login,
    logout
};