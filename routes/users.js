const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const passport = require('passport');
require('../middlewares/passport')(passport);

router.post('/register', controller.register);
router.post('/updatePassword', passport.authenticate('jwt', {session: false}), controller.updatePassword);
router.delete('/delete', passport.authenticate('jwt', {session: false}), controller.deleteUser);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
module.exports = router;
