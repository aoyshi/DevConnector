const profileService = require('./profile.service');
const userService = require('../user/user.service');
const errorHandler = require('../../utils/errorHandling/errorHandler.js');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    res.status(200).json({ profile });
  } catch (err) {
    errorHandler(res, err);
  }
};

const upsertProfile = async (req, res) => {
  try {
    const profile = await profileService.upsertProfile(req);
    res.status(200).json({ profile });
  } catch (err) {
    errorHandler(res, err);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.params.id);
    res.status(200).json({ profile });
  } catch (err) {
    errorHandler(res, err);
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.status(200).json(profiles);
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteEverything = async (req, res) => {
  try {
    await profileService.deleteProfileByUserId(req.user.id);
    await userService.deleteUser(req.user.id);
    // TODO: delete user's POSTS
    res.status(200).json({ msg: 'Deleted current user profile.' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// EXPERIENCES

const createExperience = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    const updatedProfile = await profileService.createExperience(req, profile);
    res.status(201).json({ updatedProfile });
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteExperience = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    await profileService.deleteExperience(req.params.id, profile);
    res.status(201).json('Deleted experience from current profile.');
  } catch (err) {
    errorHandler(res, err);
  }
};

// EDUCATION

const createEducation = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    const updatedProfile = await profileService.createEducation(req, profile);
    res.status(201).json({ updatedProfile });
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteEducation = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    await profileService.deleteEducation(req.params.id, profile);
    res.status(201).json('Deleted education from current profile.');
  } catch (err) {
    errorHandler(res, err);
  }
};

// GITHUB
const getGithubRepos = async (req, res) => {
  try {
    const repos = await profileService.getGithubRepos(req.params.username);
    res.status(200).json(repos);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = {
  getCurrentProfile,
  upsertProfile,
  getUserProfile,
  getAllProfiles,
  deleteEverything,
  createExperience,
  deleteExperience,
  createEducation,
  deleteEducation,
  getGithubRepos,
};
