const path = require('path');

const logger = require('../../../logger/winston.logger')(path.basename(__filename));

const getHttpCode = (errName) => {
  if (errName === 'ResourceNotFoundError') return 404;
  if (errName === 'ResourceAlreadyExistsError') return 409;
  if (errName === 'AuthenticationError') return 401;
  return 500;
};

const errorHandler = (res, err) => {
  logger.error(`${err.name}: ${err.message} \n[${err.stack}]`);
  res.status(getHttpCode(err.name)).json(err.message);
};

module.exports = errorHandler;
