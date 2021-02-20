const Post = require('./post.model');
const ResourceNotFoundError = require('../../utils/errorHandling/exceptions/ResourceNotFoundError');
const ResourceAlreayExistsError = require('../../utils/errorHandling/exceptions/ResourceAlreadyExistsError');
const AuthenticationError = require('../../utils/errorHandling/exceptions/AuthenticationError');
const userService = require('../user/user.service');

const verifyPostExists = (post) => {
  if (!post) {
    throw ResourceNotFoundError('post');
  }
};

const createPost = async (req) => {
  const user = await userService.getUserById(req.user.id);

  const post = new Post({
    user: req.user.id,
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
  });

  await post.save();
  return post;
};

const getAllPosts = async () => {
  const posts = await Post.find().sort({ createdAt: -1 });
  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findById(id);
  verifyPostExists(post);
  return post;
};

const deletePostById = async (postId, currentUserId) => {
  const post = await Post.findById(postId);
  verifyPostExists(post);

  if (post.user.toString() !== currentUserId) {
    throw AuthenticationError();
  }

  post.remove();
};

const likePostById = async (postId, userId) => {
  const post = await getPostById(postId);

  // return if user already liked this post
  if (post.likes.filter((like) => like.user.toString() === userId).length > 0) {
    throw ResourceAlreayExistsError('post like');
  }

  post.likes.unshift({ user: userId });
  await post.save();

  return post.likes;
};

const unlikePostById = async (postId, userId) => {
  const post = await getPostById(postId);

  // return if user never liked post to begin with
  if (post.likes.filter((like) => like.user.toString() === userId).length === 0) {
    throw ResourceAlreayExistsError('post unlike');
  }

  post.likes = post.likes.filter((like) => like.user.toString() !== userId);
  await post.save();

  return post.likes;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  likePostById,
  unlikePostById,
};
