const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('./user.model');
const { verifyResourceExists, verifyResourceUnique } = require('../../helpers/errorHandling/common/resourceChecker');

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  verifyResourceExists(user, 'user');
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  verifyResourceExists(user, 'user');
  return user;
};

const createUser = async (req) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  verifyResourceUnique(user, 'user');

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'identicon',
  });
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: encryptedPassword,
    avatar,
  });
  await newUser.save();
  return newUser;
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
