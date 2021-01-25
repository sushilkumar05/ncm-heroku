const express = require('express');
const router = express.Router();
const jobMasterController = require('../controllers/jobMaster.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createJobMasterSchema, updateJobMasterSchema } = require('../middleware/validators/jobMasterValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(jobMasterController.getAllJobMasters)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(jobMasterController.getJobMasterById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createJobMasterSchema, awaitHandlerFactory(jobMasterController.createJobMaster)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(Role.Admin), updateJobMasterSchema, awaitHandlerFactory(jobMasterController.updateJobMaster)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(jobMasterController.deleteJobMaster)); // localhost:3000/api/v1/countries/id/1

module.exports = router;