const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/register', controller.register);
router.post('/get/', controller.getUser);
router.post('/delete/', controller.deleteUser);
module.exports = router;
