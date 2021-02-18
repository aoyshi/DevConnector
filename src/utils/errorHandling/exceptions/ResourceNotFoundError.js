const ResourceNotFoundError = (resourceName) => ({
  name: 'ResourceNotFoundError',
  message: `This ${resourceName} does not exist.`,
  stack: new Error().stack,
});

module.exports = ResourceNotFoundError;
