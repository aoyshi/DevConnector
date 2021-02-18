const AuthenticationError = () => ({
  name: 'AuthenticationError',
  message: 'Authentication failed.',
  stack: new Error().stack,
});

module.exports = AuthenticationError;
