const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createVendorSchema, updateVendorSchema } = require('../middleware/validators/vendorValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(vendorController.getAllVendors)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(vendorController.getVendorById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createVendorSchema, awaitHandlerFactory(vendorController.createVendor)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateVendorSchema, awaitHandlerFactory(vendorController.updateVendor)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(vendorController.deleteVendor)); // localhost:3000/api/v1/countries/id/1

module.exports = router;