const express = require('express');
const userController = require('./controller.js');
const { userCreationRules, validate } = require('./validator.js');

const router = express.Router();

router.post('/', userCreationRules(), validate, userController.createUser);

module.exports = router;
