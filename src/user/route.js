const express = require('express');

const router = express.Router();

/*
 * @route    POST api/users
 * @desc     Registers a user
 * @access   Public
 */
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('User Route');
});

module.exports = router;
