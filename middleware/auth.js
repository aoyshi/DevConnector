const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedToken.user;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid.' });
  }
};
