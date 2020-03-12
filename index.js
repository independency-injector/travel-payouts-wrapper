const express = require('express');
require('dotenv').config();
const app = express();

require('.//startup/router')(app);


app.listen(3000, () => {
    console.log("rabotem.");
});

/*
TODO:

[x] - setup routing arch
[] - DB setup
[x] - err middles
[] -

...

[] - delete TODO section


*/