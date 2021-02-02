const express = require('express');
const router = express.Router();
const userRolesMappingController = require('../controllers/userRolesMapping.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserRolesMappingSchema, updateUserRolesMappingSchema } = require('../middleware/validators/userRolesMappingValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(userRolesMappingController.getAllUserRolesMappings)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(userRolesMappingController.getUserRolesMappingById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createUserRolesMappingSchema, awaitHandlerFactory(userRolesMappingController.createUserRolesMapping)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateUserRolesMappingSchema, awaitHandlerFactory(userRolesMappingController.updateUserRolesMapping)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(userRolesMappingController.deleteUserRolesMapping)); // localhost:3000/api/v1/countries/id/1

module.exports = router;