const { body } = require('express-validator');

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
  body('from').trim()
    .not().isEmpty()
    .withMessage('From Date is required'),
];

module.exports = {
  profileCreationRules,
  experienceCreationRules,
  educationCreationRules,
};
