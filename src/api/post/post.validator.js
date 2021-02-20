const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const postCreationRules = () => [
  body('text').trim()
    .not().isEmpty()
    .withMessage('Text is required for posts.'),
];

const commentCreationRules = () => [
  body('text').trim()
    .not().isEmpty()
    .withMessage('Text is required for comments.'),
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
  postCreationRules,
  commentCreationRules,
  mongooseObjectIdRules,
  validate,
};
