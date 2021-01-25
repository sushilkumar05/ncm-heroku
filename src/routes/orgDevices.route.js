const express = require('express');
const router = express.Router();
const orgDevicesController = require('../controllers/orgDevices.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createOrgDevicesSchema, updateOrgDevicesSchema } = require('../middleware/validators/orgDevicesValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(orgDevicesController.getAllOrgDevicess)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(orgDevicesController.getOrgDevicesById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createOrgDevicesSchema, awaitHandlerFactory(orgDevicesController.createOrgDevices)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateOrgDevicesSchema, awaitHandlerFactory(orgDevicesController.updateOrgDevices)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(orgDevicesController.deleteOrgDevices)); // localhost:3000/api/v1/countries/id/1

module.exports = router;