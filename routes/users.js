const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/register', controller.register);
router.post('/get', controller.getUser);
router.delete('/delete', controller.deleteUser);
router.post('/updatePassword', controller.updatePassword);
module.exports = router;
