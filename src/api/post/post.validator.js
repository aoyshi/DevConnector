const { body } = require('express-validator');

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

module.exports = {
  postCreationRules,
  commentCreationRules,
};
