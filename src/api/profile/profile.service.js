const Profile = require('./profile.model.js');

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
  const removeIndex = profile.experience.map((exp) => exp.id).indexOf(expId);
  profile.experience.splice(removeIndex, 1);
  await profile.save();
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
  const removeIndex = profile.education.map((edu) => edu.id).indexOf(eduId);
  profile.education.splice(removeIndex, 1);
  await profile.save();
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
};
