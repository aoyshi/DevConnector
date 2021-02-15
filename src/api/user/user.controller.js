const userService = require('./user.service.js');
const authHelper = require('../auth/auth.helper.js');

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    const token = authHelper.createJwtToken(user);

    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
  getCurrentUser,
};
