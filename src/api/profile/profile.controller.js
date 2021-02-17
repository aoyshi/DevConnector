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

const getUserProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'This user does not have a profile.' });
    }
    return res.status(200).json({ profile });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid format for user ID.' });
    }
    console.log(err.message);
    return res.status(500).send('Server Error.');
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    return res.status(200).send(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error.');
  }
};

module.exports = {
  getCurrentProfile,
  upsertProfile,
  getUserProfile,
  getAllProfiles,
};
