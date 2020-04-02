const { User } = require('../models/index');
const { to, error, throwError, success } = require('../util/requestHelper');
const auth = require('../services/authService');

const register = async (req, res) => {
    const { body } = req;
    if(!body.username || !body.email || !body.password) return error(res, 'Invalid credentials', 400);
    if(User.findOne( { where: { email: body.email} }) !== null) return error(res, 'User with such email is already registered', 400);  
    let err, user;
    [err, user] = await to(auth.register(body));
    if(err) return error(res, err.message, 400);
    [err, user] = await to(auth.login(body));
    return success(res, {message: 'Successfully created new user', user: user}, 201);
};

const updatePassword = async (req, res) => {
    const { body } = req;
    if (!body.email || !body.oldPassword) { return error(res, 'Provide email and password', 400) };
    let [err, user] = await to(User.findOne({ where: { email: body.email } }));
    if (err) { return error(res, err.message, 500) };
    if (user == null) return error(res, 'No such user found.', 404);
    if(!(await user.validatePassword(body.oldPassword)) ) { return error(res, 'Wrong password!', 401) }; 
    [err, user] = await to(user.update({ password: body.newPassword }, { where: { email: body.email } }));
    if (err) { return error(res, err.message, 500) };
    return success(res, { message: 'Successfully updated a users password' }, 200);
}

module.exports = {
    updatePassword,
    register,
};