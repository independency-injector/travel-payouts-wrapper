const { User } = require('../models/index');
const { to, error, throwError, success } = require('../util/requestHelper');
const auth = require('../services/authService');


const getUser = async (req, res) => {
    // later on this will implement login logic as we dont need to get users directly
    const { body } = req;
    if (!body.username) { return error(res, 'Provide username.', 400); };
    const [err, user] = await to(User.findOne({ where: { username: body.username } }));
    if (err) { return error(res, err.message) };
    if (user == null) { return error(res, 'No such user in db', 404); };
    return success(res, { user: user }, 201);
};
 
const register = async(req, res) => {
    const { body } = req;
    if(!body.username || !body.email){
        return error(res, 'Enter username and email to register.', 400);
    }
    if(!body.password)  return error(res, 'Enter password to register.', 400);
    let err, user;
    [err] = await to(auth.register(body));
    if(err) return error(res, err.message, 400);
    [err, user] = await to(auth.login(body));
    return success(res, { message: 'Successfully registered.', user: user}, 201);
};

const login = async(req, res) => {
    const { body } = req;
    let [err, user] = await to(auth.login(body));
    console.log()
    if(err) { return error(res, err.message, 400) };
    return success(res, user);
    };

const logout = async(req, res) => {
    req.logout();
    return success(res, {message: 'Successfully logged out.'}, 200);
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

const deleteUser = async (req, res) => {
    const { body } = req;
    if (!body.email) { return error(res, 'Provide email of the user you want to delete', 400); };
    let [err, user] = await to(User.findOne({ where: { email: body.email } }));
    if (err) { return error(res, err.message) };
    if (user == null) return error(res, 'No such user in db.', 404);
    [err, user] = await to(User.destroy({ where: { email: user.email } }));
    if (err) return error(res, err.message, 500);
    return success(res, { message: 'Successfully deleted user:', user: body.email }, 200);

}

module.exports = {
    register,
    getUser,
    deleteUser,
    updatePassword,
    login, 
    logout
};