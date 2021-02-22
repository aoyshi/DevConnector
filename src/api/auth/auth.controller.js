const bcrypt = require('bcryptjs');

const userService = require('../user/user.service');
const authHelper = require('./auth.helper');
const errorHandler = require('../../helpers/errorHandling/errorHandler.js');
const AuthenticationError = require('../../helpers/errorHandling/exceptions/AuthenticationError');

const matchPassword = async (user, password) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw AuthenticationError();
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    await matchPassword(user, password);

    const token = authHelper.createJwtToken(user);
    res.status(200).json({ token });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = {
  authenticateUser,
};
