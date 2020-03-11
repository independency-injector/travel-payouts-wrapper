const express = require('express');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const controller = require('../controllers/appController');
const router = express.Router();

router.get('/', asyncMiddleware(controller.backslash));
router.get('/cheapest', asyncMiddleware(controller.cheap));
router.get('/calendar', asyncMiddleware(controller.calendar));
router.get('/airlines', asyncMiddleware(controller.allAirlines));

module.exports = router;
