const express = require('express');

const profileController = require('./profile.controller.js');
const authMiddleware = require('../../../middleware/auth.js');
const {
  profileCreationRules,
  experienceCreationRules,
  mongooseObjectIdRules,
  educationCreationRules,
  validate,
} = require('./profile.validator');

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

/*
 * @route    POST api/profiles/experiences
 * @desc     Add experience to current profile
 * @access   Private
 */
router.post('/experiences', authMiddleware, experienceCreationRules(), validate, profileController.createExperience);

/*
 * @route    DELETE api/profiles/experiences/:expId
 * @desc     Delete experience from current profile
 * @access   Private
 */
router.delete('/experiences/:id', authMiddleware, mongooseObjectIdRules(), validate, profileController.deleteExperience);

/*
 * @route    POST api/profiles/educations
 * @desc     Add education to current profile
 * @access   Private
 */
router.post('/educations', authMiddleware, educationCreationRules(), validate, profileController.createEducation);

/*
 * @route    DELETE api/profiles/educations/:eduId
 * @desc     Delete education from current profile
 * @access   Private
 */
router.delete('/educations/:id', authMiddleware, mongooseObjectIdRules(), validate, profileController.deleteEducation);

module.exports = router;
