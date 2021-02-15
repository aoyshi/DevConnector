const Profile = require('./profile.model.js');

const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({ user: userId });
  return profile;
};

module.exports = {
  getProfileByUserId,
};
