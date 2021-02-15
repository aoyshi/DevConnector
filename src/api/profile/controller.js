const Profile = require('./model.js');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'This user does not have a profile.' });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error.');
  }
};

module.exports = {
  getCurrentProfile,
};
