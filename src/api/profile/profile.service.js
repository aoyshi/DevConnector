const axios = require('axios');
require('dotenv').config();

const Profile = require('./profile.model.js');
const ResourceNotFoundError = require('../../utils/errorHandling/exceptions/ResourceNotFoundError');

const verifyProfileExists = (profile) => {
  if (!profile) {
    throw ResourceNotFoundError('profile');
  }
};

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
  verifyProfileExists(profile);
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

const createExperience = async (req, profile) => {
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

const deleteExperience = async (expId, profile) => {
  const updatedProfile = profile;
  updatedProfile.experience = profile.experience.filter(
    (exp) => exp.id.toString() !== expId,
  );
  await updatedProfile.save();
};

// EDUCATION

const createEducation = async (req, profile) => {
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

const deleteEducation = async (eduId, profile) => {
  const updatedProfile = profile;
  updatedProfile.education = profile.education.filter(
    (edu) => edu.id.toString() !== eduId,
  );
  await updatedProfile.save();
};

const getGithubRepos = async (username, res) => {
  const uri = `https://api.github.com/users/${username}/repos?pre_page=1&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`;
  const headers = { 'user-agent': 'node.js' };

  try {
    const response = await axios.get(uri, headers);
    return response.data;
  } catch (err) {
    if (err.response.status === 404) throw ResourceNotFoundError('github repo');
    console.log(err);
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
