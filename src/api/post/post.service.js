const Post = require('./post.model');
const ResourceNotFoundError = require('../../utils/errorHandling/exceptions/ResourceNotFoundError');
const ResourceAlreayExistsError = require('../../utils/errorHandling/exceptions/ResourceAlreadyExistsError');
const AuthenticationError = require('../../utils/errorHandling/exceptions/AuthenticationError');
const userService = require('../user/user.service');

const verifyResourceExists = (obj, name) => {
  if (!obj) {
    throw ResourceNotFoundError(name);
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
  verifyResourceExists(post, 'post');
  return post;
};

const deletePostById = async (postId, currentUserId) => {
  const post = await Post.findById(postId);
  verifyResourceExists(post, 'post');

  if (post.user.toString() !== currentUserId) {
    throw AuthenticationError();
  }

  post.remove();
};

const likePost = async (postId, userId) => {
  const post = await getPostById(postId);

  // return if user already liked this post
  if (post.likes.filter((like) => like.user.toString() === userId).length > 0) {
    throw ResourceAlreayExistsError('post like');
  }

  post.likes.unshift({ user: userId });
  await post.save();

  return post.likes;
};

const unlikePost = async (postId, userId) => {
  const post = await getPostById(postId);

  // return if user never liked post to begin with
  if (post.likes.filter((like) => like.user.toString() === userId).length === 0) {
    throw ResourceAlreayExistsError('post unlike');
  }

  post.likes = post.likes.filter((like) => like.user.toString() !== userId);
  await post.save();

  return post.likes;
};

const createComment = async (req) => {
  const post = await getPostById(req.params.id);
  const user = await userService.getUserById(req.user.id);

  post.comments.unshift({
    user: req.user.id,
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
  });

  await post.save();
  return post.comments;
};

const deleteComment = async (postId, commentId, userId) => {
  const post = await Post.findById(postId);
  verifyResourceExists(post, 'post');
  const comment = post.comments.find((com) => com.id === commentId);
  verifyResourceExists(comment, 'comment');

  if (comment.user.toString() !== userId) {
    throw AuthenticationError();
  }

  post.comments = post.comments.filter(
    (com) => com.id.toString() !== commentId,
  );

  await post.save();
  return post.comments;
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
