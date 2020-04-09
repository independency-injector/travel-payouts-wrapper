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

const regSchema = Joi.object({
    username: Joi.string()
    .required()
    .min(5),
    email: Joi.string()
    .required()
    .email({minDomainAtoms: 2}),
    password: Joi.string()
    .required()
    .min(5)
});

const validateTicket = (ticket) => {
    const { error } = ticketSchema.validate(ticket);
    if(error) return false;
    return true;
};


 const validateReg = (reg) => {
    const { error } = regSchema.validate(reg);
    if(error) return false;
    return true;
};

module.exports = {
    validateTicket,
    validateReg
}