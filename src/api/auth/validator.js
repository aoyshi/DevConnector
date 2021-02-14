const { body, validationResult } = require('express-validator');

const loginRules = () => [
  body('email', 'Email is required.').not().isEmpty(),
  body('password', 'Password is required.').not().isEmpty(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(({ msg }) => ({ msg })) });
  }
  return next();
};

module.exports = {
  loginRules,
  validate,
};
