const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');

exports.createStateSchema = [
    check('stateName')
        .exists()
        .withMessage('stateName is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
]

exports.updateStateSchema = [
    check('stateName')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),  
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'usersFirstName', 'usersLastName', 'age'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
]