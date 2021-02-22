const ResourceNotFoundError = require('../exceptions/ResourceNotFoundError');
const ResourceAlreayExistsError = require('../exceptions/ResourceAlreadyExistsError');

const verifyResourceExists = (obj, name) => {
  if (!obj) {
    throw ResourceNotFoundError(name);
  }
};

const verifyResourceUnique = (obj, name) => {
  if (obj) {
    throw ResourceAlreayExistsError(name);
  }
};

module.exports = {
  verifyResourceExists,
  verifyResourceUnique,
};
