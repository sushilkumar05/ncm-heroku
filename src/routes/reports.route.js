const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createReportSchema, updateReportSchema } = require('../middleware/validators/reportsValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(reportsController.getAllReports)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(reportsController.getReportById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createReportSchema, awaitHandlerFactory(reportsController.createReport)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateReportSchema, awaitHandlerFactory(reportsController.updateReport)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(reportsController.deleteReport)); // localhost:3000/api/v1/countries/id/1

module.exports = router;