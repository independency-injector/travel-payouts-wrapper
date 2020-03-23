const express = require('express');
const controller = require('../controllers/appController');
const router = express.Router();

router.get('/', controller.backslash);
router.get('/cheap', controller.cheap);
router.get('/calendar', controller.calendar);
router.get('/airlines', controller.allAirlines);
router.get('/cities', controller.allCities);
router.get('/countries', controller.allCountries);

module.exports = router;
