const express = require('express');
const router = express.Router();
const stateController = require('../controllers/state.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createStateSchema, updateStateSchema } = require('../middleware/validators/stateValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(stateController.getAllStates)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(stateController.getStateById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createStateSchema, awaitHandlerFactory(stateController.createState)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateStateSchema, awaitHandlerFactory(stateController.updateState)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(stateController.deleteState)); // localhost:3000/api/v1/countries/id/1

module.exports = router;