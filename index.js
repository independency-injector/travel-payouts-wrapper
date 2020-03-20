const express = require('express');
const app = express();
require('dotenv').config();
require('./startup/logging')();
require('./startup/router')(app);


app.listen(3000, () => {
    console.log("rabotaem.");
});


/*
TODO:
[X] - pizda, poplava, peredelat` zanovo, bo vmyrayu

*/