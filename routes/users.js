const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({
        message: "add a user"
    })
});

router.get('/', (req, res) => {
    res.json({
        message: "get a user by request body"
    })
})

router.get('/:id', (req, res) => {
    res.json({
        message: `get a user with ${req.params.id} id`
    })
})

router.delete('/:id', (req, res) => {
    res.json({
        message: `delete a user with ${req.params.id} id`
    })
})

module.exports = router;