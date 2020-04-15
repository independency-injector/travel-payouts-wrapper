const { User, Ticket } = require('../models/index');
const { to, error, throwErorr, success } = require('../util/requestHelper');
const validator = require('../util/validator');

const addTicket = async (req, res) => {
    const { body }  = req;
    const auth = req.user;
    if(!validator.validateTicket(body)) return error(res, 'Invalid ticket format. Check the documentation', 400);
    let [err, user] = await to(User.findOne( {where: {id: auth.id} } ));
    if(err) return error(res, 'Invalid credentials:' + err, 400);
    if(user == null) return error(res, 'No such user', 404);
    [err, tickets] = await to(user.createTicket(body));
    if(err) return error(res, 'Invalid data:' + err, 400);
    return success(res, {message: `Successfully added new ticket to user ${body.email}:`, tickets: tickets}, 201);  
};

const getTickets = async(req, res) => {
    const body = req.user;
    let [err, user] = await to(User.findOne( { where: {id: body.id} } ));
    if(err) return error(res, 'Invalid credentials:' + err, 400);
    if(user == null) return error(res, 'No such user', 404); 
    [err, tickets] = await to(user.getTickets());
    if(err) return error(res, 'An error occured:' + error, 500);
    if(tickets.length == 0) return success(res, { message: 'This user has no tickets' }, 404);
    return success(res, {tickets: tickets}, 200);
}

const deleteTicket = async(req, res) => {
    const id = parseInt(req.params.id);
    if(!id) return error(res, 'Invalid id', 400);
    const auth = req.user;
    let err, user, ticket;
    [err, user] = await to(User.findOne( { where: {id: auth.id } } ));
    [err, ticket] = await to(user.getTickets({ where: { id: id } } ));
    if(err) return error(res, 'An error occured', 500);
    if(ticket.length == 0) return error(res, 'No ticket with given id was found for this user', 404);
    [err, ticket] = await to(Ticket.destroy({ where: {id: id, userId: auth.id } } ));
    if(err) return error(res, err.message, 500);
    return success(res, { message: `Successfully deleted ${ticket} ticket with id ${id}`}, 200);
}



module.exports = {
    addTicket,
    getTickets,
    deleteTicket
}