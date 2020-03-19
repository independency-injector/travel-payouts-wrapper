const User = require('../models/user');
const { to, success, error, throwError } = require('../util/requestHelper');
const authService = require('../services/auth');

const create = async (req, res) => {
    const { body } = req;
    if(!body.username || !body.email){
        return error(res, 'Provide a username and an email.', 400);
    }
        if(!body.password){
            return error(res, 'Provide a password', 400);
        }
        let err, user;
        [err] = await to(authService.register(body));
        if (err) return error(res, err.message, 400);
        [err, user] = await to(authService.login(body));
        console.log(user);
        return success(res, {message:'Successfully created new user.', user: user}, 201);

};

const login = async (req, res) => {
    const { body } = req;
    let err, user;
    [err, user] = await to(authService.login(body));
    if (err) return  error(res, err.message, 400);
    return success(res, user);
  };

  
  const logout = async (req, res) => {
    req.logout();
    return success(res, {message: 'Successfull logout.'}, 200);
  };

  exports.create = create;
  exports.login = login;
  exports.logout = logout;