const { User } = require('../models/index');
const { to, error, success } = require('../util/requestHelper');
const auth = require('../services/authService');
const validator = require('../util/validator');

const register = async (req, res) => {
    const { body } = req;
    if(!validator.validateReg(body)) return error(res, 'Invalid info, check the documentation for details', 400);
    if(await User.findOne( { where: { email: body.email} }) !== null) return error(res, 'User with such email is already registered', 400); 
    let [err, user] = await to(auth.register(body));
    if(err) return error(res, err.message, 400);
    [err, user] = await to(auth.login(body));
    return success(res, {message: 'Successfully created new user', user: user}, 201);
};


const login = async(req, res) => {
    const { body } = req;   
    let [err, user] = await to(auth.login(body));
    if(err !== null) return error(res, err.message, 400);
    return success(res, user, 200);
}

const logout = async(req, res) => {
    req.logOut();
    return success(res, {message: 'Successfully logged out.'}, 200);
};

const updatePassword = async (req, res) => {
    const { body } = req;
    const auth = req.user;
    if (!body.newPassword || !body.oldPassword) { return error(res, 'Provide pair of old and new passwords of the user', 400) };
    let [err, user] = await to(User.findOne({ where: { id: auth.id } }));
    if (err) { return error(res, err.message, 500) };
    if (user == null) return error(res, 'No such user found', 404);
    if(!(await user.validatePassword(body.oldPassword)) ) { return error(res, 'Wrong password!', 401) }; 
    [err, user] = await to(user.update({ password: body.newPassword }, { where: { id: auth.id } }));
    if (err) { return error(res, err.message, 500) };
    return success(res, { message: 'Successfully updated a users password' }, 200);
}

const deleteUser = async (req, res) => {
    const auth = req.user;
    let [err, user] = await to(User.findOne( { where: { id: auth.id} } ));
    if(err) return error(res, err.message, 400);
    if(user == null) return error(res, 'No such user found', 404);
    [err, user] = await to(User.destroy({ where: { id: auth.id } }));
    if (err) return error(res, err.message, 500);
    return success(res, { message: 'Successfully deleted user' }, 200);  
}

module.exports = {
    updatePassword,
    register,
    deleteUser,
    login,
    logout
};