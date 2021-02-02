const express = require('express');
const router = express.Router();
const configController = require('../controllers/config.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createConfigSchema, updateConfigSchema } = require('../middleware/validators/configValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(configController.getAllConfigs)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(configController.getConfigById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createConfigSchema, awaitHandlerFactory(configController.createConfig)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateConfigSchema, awaitHandlerFactory(configController.updateConfig)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(configController.deleteConfig)); // localhost:3000/api/v1/countries/id/1

module.exports = router;