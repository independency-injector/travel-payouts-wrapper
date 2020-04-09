const express = require('express');
const app = express();
require('dotenv').config();
require('./startup/logging')();
require('./startup/router')(app);
const db = require('./models/index');

db.sequelize.authenticate().then(() => {
    console.log('Connected to db');
}).catch(err => console.log('Error occured while connecting to db' + err.message));

db.sequelize.sync().then(() => console.log('Successfully sync`d with db')).catch(err => console.log('Couldn`t sync with db:' + err.message));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});

