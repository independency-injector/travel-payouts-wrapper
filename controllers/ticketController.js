const { User } = require('../models/index');
const { to, error, throwErorr, success } = require('../util/requestHelper');

const addTicket = async (req, res) => {
    const { body } = req;
    let [err, user] = await to(User.findOne( {where: {email: body.email} } ));
}

module.exports = {
    addTicket,

}