const express = require('express');
const app = express();
require('dotenv').config();
require('./startup/logging')();
require('./startup/router')(app);
require('./startup/db')();

app.listen(3000, () => {
    console.log("rabotaem.");
});

