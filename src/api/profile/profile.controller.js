const profileService = require('./profile.service');
const userService = require('../user/user.service');

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
    res.status(200).send(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error.');
  }
};

const deleteEverything = async (req, res) => {
  try {
    await profileService.deleteProfileByUserId(req.user.id);
    await userService.deleteUser(req.user.id);
    // TODO: delete user's POSTS
    res.status(200).json({ msg: 'Deleted current user profile.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error.');
  }
};

module.exports = {
  getCurrentProfile,
  upsertProfile,
  getUserProfile,
  getAllProfiles,
  deleteEverything,
};
