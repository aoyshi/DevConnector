const postService = require('./post.service');
const errorHandler = require('../../utils/errorHandling/errorHandler');

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
    res.json(posts);
  } catch (err) {
    errorHandler(res, err);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
};
