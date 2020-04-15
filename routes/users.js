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
router.post('/addTicket', passport.authenticate('jwt', {session: false}), ticketController.addTicket);
router.post('/getTickets', passport.authenticate('jwt', {session: false}), ticketController.getTickets);
router.delete('/deleteTicket/:id', passport.authenticate('jwt', {session: false}), ticketController.deleteTicket);
module.exports = router;
