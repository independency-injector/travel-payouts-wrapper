const express = require('express');
const root = require('../routes/root');
const users = require('../routes/users');
const routeMiddlewares = require('../middlewares/routesMiddleware');
const cors = require('cors');
module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(routeMiddlewares.envCheck);
    app.use('/', root);
    app.use('/users', users);
    app.use(routeMiddlewares.notFound);
    app.use(routeMiddlewares.errorMiddleware);
};