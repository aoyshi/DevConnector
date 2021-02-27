const { body } = require('express-validator');

const userCreationRules = () => [
  body('name').trim()
    .not().isEmpty()
    .withMessage('Name is required.')
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters.'),
  body('email').trim()
    .not().isEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email address.'),
  body('password')
    .not().isEmpty()
    .withMessage('Password is required.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

module.exports = {
  userCreationRules,
};
