const express = require('express');
const router = express.Router();
const categoriesTypeController = require('../controllers/categoriesType.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCategoriesTypeSchema, updateCategoriesTypeSchema } = require('../middleware/validators/categoriesTypeValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(categoriesTypeController.getAllCategoriesTypes)); // localhost:3000/api/v1/countries
router.get('/id/:id', auth(), awaitHandlerFactory(categoriesTypeController.getCategoriesTypeById)); // localhost:3000/api/v1/countries/id/1
router.post('/', createCategoriesTypeSchema, awaitHandlerFactory(categoriesTypeController.createCategoriesType)); // localhost:3000/api/v1/countries
router.patch('/id/:id', auth(), updateCategoriesTypeSchema, awaitHandlerFactory(categoriesTypeController.updateCategoriesType)); // localhost:3000/api/v1/countries/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(categoriesTypeController.deleteCategoriesType)); // localhost:3000/api/v1/countries/id/1

module.exports = router;