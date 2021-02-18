const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const profileCreationRules = () => [
  body('status').trim()
    .not().isEmpty()
    .withMessage('Status is required.'),
  body('skills').trim()
    .not().isEmpty()
    .withMessage('Skills is required'),
];

const experienceCreationRules = () => [
  body('title').trim()
    .not().isEmpty()
    .withMessage('Title is required.'),
  body('company').trim()
    .not().isEmpty()
    .withMessage('Company is required'),
  body('from').trim()
    .not().isEmpty()
    .withMessage('From Date is required'),
];

const educationCreationRules = () => [
  body('school').trim()
    .not().isEmpty()
    .withMessage('School is required.'),
  body('degree').trim()
    .not().isEmpty()
    .withMessage('Degree is required'),
  body('fieldOfStudy').trim()
    .not().isEmpty()
    .withMessage('Field of study is required'),
  body('from').trim()
    .not().isEmpty()
    .withMessage('From Date is required'),
];

const mongooseObjectIdRules = () => [
  param('id').custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error('/:id param must be a valid mongoose objectId.');
    }
    return true;
  }),
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
  experienceCreationRules,
  educationCreationRules,
  mongooseObjectIdRules,
  validate,
};
