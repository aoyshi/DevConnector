const { body } = require('express-validator');

const loginRules = () => [
  body('email', 'Email is required.').not().isEmpty(),
  body('password', 'Password is required.').not().isEmpty(),
];

module.exports = {
  loginRules,
};
