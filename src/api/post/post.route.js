const express = require('express');

const authMiddleware = require('../../../middleware/auth');
const { postCreationRules, commentCreationRules } = require('./post.validator');
const { mongooseObjectIdRules, validate } = require('../../helpers/validation/validation.helper');
const postController = require('./post.controller');

const router = express.Router();

/*
 * @route    POST api/posts
 * @desc     Create a new post
 * @access   Private
 */
router.post('/', authMiddleware, postCreationRules(), validate, postController.createPost);

/*
 * @route    GET api/posts
 * @desc     Get all posts
 * @access   Public
 */
router.get('/', postController.getAllPosts);

/*
 * @route    GET api/posts/:id
 * @desc     Get single post by post id
 * @access   Public
 */
router.get('/:id', mongooseObjectIdRules(), validate, postController.getPostById);

/*
 * @route    DELETE api/posts/:id
 * @desc     Delete single post by post id
 * @access   Private
 */
router.delete('/:id', authMiddleware, mongooseObjectIdRules(), validate, postController.deletePostById);

/*
 * @route    POST api/posts/:id/likes
 * @desc     Like a post by id
 * @access   Private
 */
router.post('/:id/likes', authMiddleware, mongooseObjectIdRules(), validate, postController.likePost);

/*
 * @route    DELETE api/posts/:id/likes
 * @desc     Unlike a post by id
 * @access   Private
 */
router.delete('/:id/likes', authMiddleware, mongooseObjectIdRules(), validate, postController.unlikePost);

/*
 * @route    POST api/posts/:id/comments
 * @desc     Create comment for a post
 * @access   Private
 */
router.post(
  '/:id/comments',
  authMiddleware,
  [mongooseObjectIdRules(), commentCreationRules()],
  validate,
  postController.createComment,
);

/*
 * @route    DELETE api/posts/:postId/comments/:commentId
 * @desc     Delete comment from a post
 * @access   Private
 */
router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  [mongooseObjectIdRules('postId'), mongooseObjectIdRules('commentId')],
  validate,
  postController.deleteComment,
);

module.exports = router;
