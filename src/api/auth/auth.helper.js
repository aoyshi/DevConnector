const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJwtToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
  );
  return token;
};

module.exports = {
  createJwtToken,
};
