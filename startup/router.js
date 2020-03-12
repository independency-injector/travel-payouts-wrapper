const express = require('express');
const router = require('../routes/rootRoute');
const middlewares = require('../middlewares/routesMiddleware');
module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(middlewares.envCheck);
    app.use('/', router);
    app.use(middlewares.notFound);
    app.use(middlewares.errorMiddleware);
};
