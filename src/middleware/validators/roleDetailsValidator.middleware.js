const { body, check } = require('express-validator');

exports.createRoleDetailSchema = [
    check('entityRead')
        .exists()
        .withMessage('entityRead is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
]

exports.updateRoleDetailSchema = [
    check('entityRead')
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