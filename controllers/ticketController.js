const { User, Ticket } = require('../models/index');
const { to, error, throwErorr, success } = require('../util/requestHelper');

const addTicket = async (req, res) => {
    const { body } = req;
    let [err, user] = await to(User.findOne( {where: {email: body.email} } ));
    if(err) return error(res, 'Invalid credentials:' + err, 400);
    if(user == null) return error(res, 'No such user', 404);
    [err, tickets] = await to(user.createTicket(body));
    if(err) return error(res, 'Invalid data:' + err, 400);
    return success(res, {message: `Successfully added new ticket to user ${body.email}:`, tickets: tickets}, 201);
};

const getTickets = async(req, res) => {
    const { body } = req;

    let [err, user] = await to(User.findOne( { where: {email: body.email } } ));
    if(err) return error(res, 'Invalid credentials:' + err, 400);
    if(user == null) return error(res, 'No such user', 404); 
    [err, tickets] = await to(user.getTickets());
    if(err) return error(res, 'An error occured:' + error, 500);
    if(tickets.length == 0) return error(res, 'This user has no tickets', 404);
    return success(res, {tickets: tickets}, 200);
}

const deleteTicket = async(req, res) => {
    const { body } = req;
    if(typeof(body.id) != 'number') return error(res, 'Invalid id', 400);
    let [err, ticket] = await to(Ticket.findOne({ where: {id: body.id } } ));
    if(err) return error(res, 'An error occured', 500);
    if(ticket == null) return error(res, 'No ticket with given id was found', 404);
    [err, ticket] = await to(ticket.destroy());
    if(err) return error(res, 'An error occured', 500);
    return success(res, {message: 'Successfully deleted ticket with id: ' + body.id}, 200);
}

module.exports = {
    addTicket,
    getTickets,
    deleteTicket
}