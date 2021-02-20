const express = require('express');

const authMiddleware = require('../../../middleware/auth');
const {
  postCreationRules,
  mongooseObjectIdRules,
  validate,
} = require('./post.validator');
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
 * @access   Private
 */
router.get('/', authMiddleware, postController.getAllPosts);

/*
 * @route    GET api/posts/:id
 * @desc     Get single post by post id
 * @access   Private
 */
router.get('/:id', authMiddleware, mongooseObjectIdRules(), validate, postController.getPostById);

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
router.post('/:id/likes', authMiddleware, mongooseObjectIdRules(), validate, postController.likePostById);

/*
 * @route    DELETE api/posts/:id/likes
 * @desc     Unlike a post by id
 * @access   Private
 */
router.delete('/:id/likes', authMiddleware, mongooseObjectIdRules(), validate, postController.unlikePostById);

module.exports = router;
