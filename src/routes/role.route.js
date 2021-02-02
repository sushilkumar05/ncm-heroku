const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createRoleSchema, updateRoleSchema } = require('../middleware/validators/roleValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(roleController.getAllRoles)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(roleController.getRoleById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createRoleSchema, awaitHandlerFactory(roleController.createRole)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateRoleSchema, awaitHandlerFactory(roleController.updateRole)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(roleController.deleteRole)); // localhost:3000/api/v1/countries/id/1

module.exports = router;