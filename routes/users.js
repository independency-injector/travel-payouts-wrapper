const express = require('express');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "users"
    })
});

module.exports = router;