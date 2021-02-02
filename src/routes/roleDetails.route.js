const express = require('express');
const router = express.Router();
const roleDetailsController = require('../controllers/roleDetails.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createRoleDetailSchema, updateRoleDetailSchema } = require('../middleware/validators/roleDetailsValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(roleDetailsController.getAllRoleDetails)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(roleDetailsController.getRoleDetailsById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createRoleDetailSchema, awaitHandlerFactory(roleDetailsController.createRoleDetails)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateRoleDetailSchema, awaitHandlerFactory(roleDetailsController.updateRoleDetails)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(roleDetailsController.deleteRoleDetails)); // localhost:3000/api/v1/countries/id/1

module.exports = router;