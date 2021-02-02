const express = require('express');
const router = express.Router();
const countryController = require('../controllers/country.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCountrySchema, updateCountrySchema } = require('../middleware/validators/countryValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(countryController.getAllCountries)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(countryController.getCountryById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createCountrySchema, awaitHandlerFactory(countryController.createCountry)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateCountrySchema, awaitHandlerFactory(countryController.updateCountry)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(countryController.deleteCountry)); // localhost:3000/api/v1/countries/id/1

module.exports = router;