const express = require('express');

const profileController = require('./profile.controller.js');
const authMiddleware = require('../../../middleware/auth.js');
const { profileCreationRules, validate } = require('./profile.validator');
const router = express.Router();

/*
 * @route    GET api/profiles/current
 * @desc     Returns current user's profile
 * @access   Private
 */
router.get('/current', authMiddleware, profileController.getCurrentProfile);

/*
 * @route    POST api/profiles
 * @desc     Creates current user's profile, or updates if already exists
 * @access   Private
 */
router.post('/', authMiddleware, profileCreationRules(), validate, profileController.upsertProfile);

module.exports = router;
