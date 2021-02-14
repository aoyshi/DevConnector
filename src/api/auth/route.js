const express = require('express');

const authMiddleware = require('../../../middleware/auth.js');
const authController = require('./controller.js');
const { loginRules, validate } = require('./validator.js');

const router = express.Router();

/*
 * @route    GET api/auth
 * @desc     Get User based on token
 * @access   Public
 */
router.get('/', authMiddleware, authController.authorizeUser);

/*
 * @route    POST api/auth
 * @desc     Authenticate User and get token
 * @access   Public
 */
router.post('/', loginRules(), validate, authController.authenticateUser);

module.exports = router;
