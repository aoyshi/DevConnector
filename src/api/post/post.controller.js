const postService = require('./post.service');
const errorHandler = require('../../helpers/errorHandling/errorHandler');

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req);
    res.json(post);
  } catch (err) {
    errorHandler(res, err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.send(posts);
  } catch (err) {
    errorHandler(res, err);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.send(post);
  } catch (err) {
    errorHandler(res, err);
  }
};

const deletePostById = async (req, res) => {
  try {
    await postService.deletePostById(req.params.id, req.user.id);
    res.json({ msg: 'Successfully deleted post' });
  } catch (err) {
    errorHandler(res, err);
  }
};

const likePost = async (req, res) => {
  try {
    const likes = await postService.likePost(req.params.id, req.user.id);
    res.send(likes);
  } catch (err) {
    errorHandler(res, err);
  }
};

const unlikePost = async (req, res) => {
  try {
    const likes = await postService.unlikePost(req.params.id, req.user.id);
    res.send(likes);
  } catch (err) {
    errorHandler(res, err);
  }
};

const createComment = async (req, res) => {
  try {
    const comments = await postService.createComment(req);
    res.json(comments);
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comments = await postService.deleteComment(req.params.postId, req.params.commentId, req.user.id);
    res.json(comments);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
};
