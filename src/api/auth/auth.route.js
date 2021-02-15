const express = require('express');

const authController = require('./auth.controller');
const { loginRules, validate } = require('./auth.validator');

const router = express.Router();

/*
 * @route    POST api/auth
 * @desc     Authenticate User (login) and get token
 * @access   Public
 */
router.post('/', loginRules(), validate, authController.authenticateUser);

module.exports = router;
