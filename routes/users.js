const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userConroller');

router.get('/register', UserController.create);
router.get('/login', UserController.login);
router.post('/logout', UserController.logout);
module.exports = router;
