const jwt = require('jsonwebtoken');
const config = require('config');

const userService = require('./service.js');

const createJwtToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 360000 },
  );
  return token;
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    const token = createJwtToken(user);

    res.status(201).send({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
};
