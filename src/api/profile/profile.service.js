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
    website: website ? website : '',
    skills: skills.split(',').map((skill) => skill.trim()),
    ...rest
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
  const profile = await Profile.findOne({ user: userId });
  return profile;
};

module.exports = {
  getProfileByUserId,
  upsertProfile,
};
