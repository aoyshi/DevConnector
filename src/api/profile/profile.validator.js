const { body, validationResult } = require('express-validator');

const profileCreationRules = () => [
  body('status').trim()
    .not().isEmpty()
    .withMessage('Status is required.'),
  body('skills').trim()
    .not().isEmpty()
    .withMessage('Skills is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(({ msg }) => ({ msg })),
    });
  }
  return next();
};

module.exports = {
  profileCreationRules,
  validate,
};
