const express = require('express');

const authMiddleware = require('../../../middleware/auth');
const userController = require('./user.controller');
const { userCreationRules } = require('./user.validator');
const { validate } = require('../../helpers/validation/validation.helper');

const router = express.Router();
/*
 * @route    POST api/users
 * @desc     Create a new user
 * @access   Public
 */
router.post('/', userCreationRules(), validate, userController.createUser);
/*
 * @route    GET api/users/current
 * @desc     Get currently logged in user based on token
 * @access   Private
 */
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;
