const express = require('express');
const router = express.Router();
const jobLogController = require('../controllers/jobLog.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createJobLogSchema, updateJobLogSchema } = require('../middleware/validators/jobLogValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(jobLogController.getAllJobLogs)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(jobLogController.getJobLogById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createJobLogSchema, awaitHandlerFactory(jobLogController.createJobLog)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateJobLogSchema, awaitHandlerFactory(jobLogController.updateJobLog)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(jobLogController.deleteJobLog)); // localhost:3000/api/v1/countries/id/1

module.exports = router;