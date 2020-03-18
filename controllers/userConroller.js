const User = require('../models/user');

const addUser = (req, res) => {
    const { error } = User.validate(req.body);
    if(error) return res.status(400).json({
        message: "Bad request"
    });
}