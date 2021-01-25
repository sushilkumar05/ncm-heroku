const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createOrganizationSchema, updateOrganizationSchema } = require('../middleware/validators/organizationValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(organizationController.getAllOrganizations)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(organizationController.getOrganizationById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createOrganizationSchema, awaitHandlerFactory(organizationController.createOrganization)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateOrganizationSchema, awaitHandlerFactory(organizationController.updateOrganization)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(organizationController.deleteOrganization)); // localhost:3000/api/v1/countries/id/1

module.exports = router;