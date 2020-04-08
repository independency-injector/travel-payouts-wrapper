const Joi = require('joi');

const ticketSchema = Joi.object({
    email: Joi.string()
    .required()
    .email(),
    origin_city: Joi.string()
    .required()
    .min(3),
    destination_city: Joi.string()
    .required()
    .min(3),
    depart_date: Joi.date()
    .required(),
    return_date: Joi.date()
    .required(),
    price: Joi.number()
    .required(),
    airline_id: Joi.string()
    .required()
    .min(2),
    flight_number: Joi.string()
    .required()
});

const validateTicket = (ticket) => {
    const { error, value } = ticketSchema.validate(ticket);
    if(error) return false;
    return true;
};

module.exports = {
    validateTicket
}