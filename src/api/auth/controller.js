const bcrypt = require('bcryptjs');

const User = require('../user/model.js');
const authHelper = require('./helper.js');

const authorizeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials!' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials!' });
    }

    const token = authHelper.createJwtToken(user);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  authorizeUser,
  authenticateUser,
};
