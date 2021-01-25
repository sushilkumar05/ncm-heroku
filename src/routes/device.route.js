const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createDeviceSchema, updateDeviceSchema } = require('../middleware/validators/deviceValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(deviceController.getAllDevices)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(deviceController.getDeviceById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createDeviceSchema, awaitHandlerFactory(deviceController.createDevice)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateDeviceSchema, awaitHandlerFactory(deviceController.updateDevice)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(deviceController.deleteDevice)); // localhost:3000/api/v1/countries/id/1

module.exports = router;