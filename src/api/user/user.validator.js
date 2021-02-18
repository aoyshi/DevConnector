const { body, validationResult } = require('express-validator');

const User = require('./user.model');

const userCreationRules = () => [
  body('name').trim()
    .not().isEmpty()
    .withMessage('Name is required.')
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters.')
    .bail()
    .isAlphanumeric()
    .withMessage('Name can only be alphanumeric.'),
  body('email').trim()
    .not().isEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email address.')
    .bail()
    .custom((email) => User.findOne({ email }).then((user) => {
      if (user) {
        return Promise.reject(new Error('This email is already registered.'));
      }
      return true;
    })),
  body('password')
    .not().isEmpty()
    .withMessage('Password is required.')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(({ msg }) => ({ msg })) });
  }
  return next();
};

module.exports = {
  userCreationRules,
  validate,
};
