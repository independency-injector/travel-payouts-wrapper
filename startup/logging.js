const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({colorized: true, perttyPrint: true}));
        
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}