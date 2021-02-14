const userService = require('./service.js');
const authHelper = require('../auth/helper.js');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    const token = authHelper.createJwtToken(user);

    res.status(201).send({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
};
