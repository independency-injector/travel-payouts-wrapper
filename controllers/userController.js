const {User} = require('../models/index');
const {to, error, throwError, success} = require('../util/requestHelper');
const register = async (req, res) => {
    const { body } = req;
    if(!body.username || !body.email) {
        return error(res, 'Provide valid username and email.', 400);
    }
    if(!body.password) { return error(res, "Provide password to register.", 400); };
    
    let err, user = await to(User.create({username: body.username, email: body.email, password:body.password}));
    if(err) return error(res,err.message, 400); 
    return success(res, {message: 'Successfully created new user', user: user}, 201);
};



const getUser = async (req, res) => {
    // later on this will implement login logic as we dont need to get users directly
    const { body } = req;
    if(!body.username){ return error(res, 'Provide username.', 400); };
    let err, user = await to(User.findOne({ where: { username: body.username} }));
    if(err) { return error(res, err.message)} else {
    return success(res, { user: user }, 201);
    }
};

module.exports = {
    register,
    getUser,
};