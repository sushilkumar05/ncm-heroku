const express = require('express');
const router = express.Router();
const roleEntityController = require('../controllers/roleEntity.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createRoleEntitySchema, updateRoleEntitySchema } = require('../middleware/validators/roleEntityValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(roleEntityController.getAllRoleEntitys)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(roleEntityController.getRoleEntityById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createRoleEntitySchema, awaitHandlerFactory(roleEntityController.createRoleEntity)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateRoleEntitySchema, awaitHandlerFactory(roleEntityController.updateRoleEntity)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(roleEntityController.deleteRoleEntity)); // localhost:3000/api/v1/countries/id/1

module.exports = router;