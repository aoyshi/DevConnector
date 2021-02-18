const getHttpCode = (errName) => {
  if (errName === 'ResourceNotFoundError') return 404;
  if (errName === 'AuthenticationError') return 401;
  return 500;
};

const errorHandler = (res, err) => {
  res.status(getHttpCode(err.name)).send(err.message);
};

module.exports = errorHandler;
