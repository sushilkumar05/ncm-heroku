const express = require('express');
const router = express.Router();
const deviceLogController = require('../controllers/deviceLog.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createDeviceLogSchema, updateDeviceLogSchema } = require('../middleware/validators/deviceLogValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(deviceLogController.getAllDeviceLogs)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(deviceLogController.getDeviceLogById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createDeviceLogSchema, awaitHandlerFactory(deviceLogController.createDeviceLog)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateDeviceLogSchema, awaitHandlerFactory(deviceLogController.updateDeviceLog)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(deviceLogController.deleteDeviceLog)); // localhost:3000/api/v1/countries/id/1

module.exports = router;