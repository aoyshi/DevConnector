const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const postCreationRules = () => [
  body('text').trim()
    .not().isEmpty()
    .withMessage('Text is required for posts.'),
];

const mongooseObjectIdRules = (paramName = 'id') => [
  param(paramName).custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error(`/:${paramName} param must be a valid mongoose objectId.`);
    }
    return true;
  }),
];

const commentDeletionRules = () => [
  mongooseObjectIdRules('postId'),
  mongooseObjectIdRules('commentId'),
];

const commentCreationRules = () => [
  body('text').trim()
    .not().isEmpty()
    .withMessage('Text is required for comments.'),
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
  commentDeletionRules,
  validate,
};
