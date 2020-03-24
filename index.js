const express = require('express');
const app = express();
require('dotenv').config();
require('./startup/logging')();
require('./startup/router')(app);


app.listen(process.env.PORT || 1488, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});

