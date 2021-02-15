const express = require('express');

const profileController = require('./profile.controller.js');
const authMiddleware = require('../../../middleware/auth.js');
const router = express.Router();

/*
 * @route    GET api/profile/current
 * @desc     Returns current user's profile
 * @access   Private
 */
router.get('/current', authMiddleware, profileController.getCurrentProfile);

module.exports = router;
