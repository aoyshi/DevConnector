const bcrypt = require('bcryptjs');

const User = require('../user/user.model');
const authHelper = require('./auth.helper');

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
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = {
  authenticateUser,
};
