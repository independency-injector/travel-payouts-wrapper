const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');
const passport = require('passport');
require('../middlewares/passport')(passport);

router.post('/register', userController.register);
router.post('/updatePassword', passport.authenticate('jwt', {session: false}), userController.updatePassword);
router.delete('/delete', passport.authenticate('jwt', {session: false}), userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/addTicket', ticketController.addTicket);
router.post('/getTickets', ticketController.getTickets);
router.delete('/deleteTicket', ticketController.deleteTicket);
module.exports = router;
