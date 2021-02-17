const express = require('express');

const profileController = require('./profile.controller.js');
const authMiddleware = require('../../../middleware/auth.js');
const { profileCreationRules, validate } = require('./profile.validator');

const router = express.Router();

/*
 * @route    POST api/profiles
 * @desc     Creates current user's profile, or Updates if already exists
 * @access   Private
 */
router.post('/', authMiddleware, profileCreationRules(), validate, profileController.upsertProfile);

/*
 * @route    GET api/profiles/me
 * @desc     Returns current user's profile
 * @access   Private
 */
router.get('/me', authMiddleware, profileController.getCurrentProfile);

/*
 * @route    GET api/profiles
 * @desc     Returns list of all user's profiles
 * @access   Public
 */
router.get('/', profileController.getAllProfiles);

/*
 * @route    GET api/profiles/users/:id
 * @desc     Returns single profile by user id
 * @access   Public
 */
router.get('/users/:id', profileController.getUserProfile);

/*
 * @route    DELETE api/profiles
 * @desc     Deletes current user, profile & posts
 * @access   Private
 */
router.delete('/', authMiddleware, profileController.deleteEverything);

module.exports = router;
