const AuthenticationError = () => ({
  name: 'AuthenticationError',
  message: 'Not authorized/authenticated.',
  stack: new Error().stack,
});

module.exports = AuthenticationError;
