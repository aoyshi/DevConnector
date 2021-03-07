const axios = require('axios');
require('dotenv').config();
const path = require('path');

const logger = require('../../../logger/winston.logger')(path.basename(__filename));

const Profile = require('./profile.model.js');
const { verifyResourceExists } = require('../../helpers/errorHandling/common/resourceChecker');

const buildProfileFields = (req) => {
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    ...rest
  } = req.body;

  const profileFields = {
    user: req.user.id,
    website: website || '',
    skills: skills.split(',').map((skill) => skill.trim()),
    ...rest,
  };
  const socialFields = {
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  };
  profileFields.social = socialFields;
  return profileFields;
};

const upsertProfile = async (req) => {
  const profileFields = buildProfileFields(req);
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return profile;
};

const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
  verifyResourceExists(profile, 'profile');
  return profile;
};

const getAllProfiles = async () => {
  const profile = await Profile.find().populate('user', ['name', 'avatar']);
  return profile;
};

const deleteProfileByUserId = async (userId) => {
  await Profile.findOneAndDelete({ user: userId });
};

// EXPERIENCES

const createExperience = async (req) => {
  const profile = await getProfileByUserId(req.user.id);
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = req.body;

  const experience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  profile.experience.unshift(experience);
  await profile.save();

  return profile;
};

const deleteExperience = async (expId, userId) => {
  const profile = await getProfileByUserId(userId);
  profile.experience = profile.experience.filter(
    (exp) => exp.id.toString() !== expId,
  );

  await profile.save();
  return profile;
};

// EDUCATION

const createEducation = async (req) => {
  const profile = await getProfileByUserId(req.user.id);
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const education = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };

  profile.education.unshift(education);
  await profile.save();

  return profile;
};

const deleteEducation = async (eduId, userId) => {
  const profile = await getProfileByUserId(userId);
  profile.education = profile.education.filter(
    (edu) => edu.id.toString() !== eduId,
  );
  await profile.save();
  return profile;
};

// eslint-disable-next-line consistent-return
const getGithubRepos = async (username) => {
  const uri = `https://api.github.com/users/${username}/repos?per_page=3&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`;
  const headers = { 'user-agent': 'node.js' };

  try {
    const response = await axios.get(uri, headers);
    return response.data;
  } catch (err) {
    if (err.response.status === 404) {
      verifyResourceExists(null, 'github repo');
    }
    logger.error(err);
  }
};

module.exports = {
  getProfileByUserId,
  upsertProfile,
  getAllProfiles,
  deleteProfileByUserId,
  createExperience,
  deleteExperience,
  createEducation,
  deleteEducation,
  getGithubRepos,
};
