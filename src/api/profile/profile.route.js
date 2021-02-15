const express = require('express');

const profileController = require('./controller.js');
const authMiddleware = require('../../../middleware/auth.js');
const router = express.Router();

/*
 * @route    GET api/profile/me
 * @desc     Returns current user's profile
 * @access   Public
 */
router.get('/me', authMiddleware, profileController.getCurrentProfile);

module.exports = router;
