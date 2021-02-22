const { param, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const mongooseObjectIdRules = (paramName = 'id') => [
  param(paramName).custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error(`/:${paramName} param must be a valid mongoose objectId.`);
    }
    return true;
  }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(({ msg }) => ({ msg })) });
  }
  return next();
};

module.exports = {
  validate,
  mongooseObjectIdRules,
};
