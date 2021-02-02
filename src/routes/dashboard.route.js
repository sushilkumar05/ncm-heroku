const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createDashboardSchema, updateDashboardSchema } = require('../middleware/validators/dashboardValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(dashboardController.getAllDashboards)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(dashboardController.getDashboardById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createDashboardSchema, awaitHandlerFactory(dashboardController.createDashboard)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateDashboardSchema, awaitHandlerFactory(dashboardController.updateDashboard)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(dashboardController.deleteDashboard)); // localhost:3000/api/v1/countries/id/1

module.exports = router;