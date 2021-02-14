const express = require('express');

const authMiddleware = require('../../../middleware/auth.js');
const authController = require('./controller.js');

const router = express.Router();

/*
 * @route    GET api/auth
 * @desc     Auth Test Route
 * @access   Public
 */
router.get('/', authMiddleware, authController.authorizeUser);

module.exports = router;
