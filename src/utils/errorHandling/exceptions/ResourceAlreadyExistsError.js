const ResourceAlreadyExistsError = (resourceName) => ({
  name: 'ResourceAlreadyExistsError',
  message: `This ${resourceName} already exists.`,
  stack: new Error().stack,
});

module.exports = ResourceAlreadyExistsError;
