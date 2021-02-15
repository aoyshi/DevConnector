const profileService = require('./profile.service');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ msg: 'This user does not have a profile.' });
    }
    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error.');
  }
};

const upsertProfile = async (req, res) => {
  const profile = await profileService.upsertProfile(req);
  res.status(201).json({ profile });
};

module.exports = {
  getCurrentProfile,
  upsertProfile,
};
