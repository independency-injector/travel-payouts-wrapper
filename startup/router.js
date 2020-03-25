const express = require('express');
const root = require('../routes/root');
const users = require('../routes/users');
const middlewares = require('../middlewares/routesMiddleware');
const cors = require('cors');
module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(middlewares.envCheck);
    app.use('/', root);
    app.use('/users', users);
    app.use(middlewares.notFound);
    app.use(middlewares.errorMiddleware);
};