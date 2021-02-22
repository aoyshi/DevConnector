const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const logger = require('../logger/winston.logger')(path.basename(__filename));

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    const msg = 'No token, authorization denied';
    logger.error(msg);
    return res.status(401).json({ msg });
  }

  // verify token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    logger.info('JWT token authorized successfully.');
    return next();
  } catch (err) {
    const msg = 'Token is not valid';
    logger.error(`${msg}: ${err}`);
    return res.status(401).json({ msg });
  }
};
