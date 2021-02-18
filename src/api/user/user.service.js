const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('./user.model');
const ResourceNotFoundError = require('../../utils/exceptions/ResourceNotFoundError');

const verifyUserExists = (user) => {
  if (!user) {
    throw ResourceNotFoundError('user');
  }
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  verifyUserExists(user);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  verifyUserExists(user);
  return user;
};

const createUser = async (req) => {
  const { name, email, password } = req.body;
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'identicon',
  });
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: encryptedPassword,
    avatar,
  });
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  await User.findOneAndDelete({ _id: id });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  deleteUser,
};
