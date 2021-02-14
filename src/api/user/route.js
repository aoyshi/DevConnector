const express = require('express');
const userController = require('./controller.js');

const router = express.Router();

router.post('/', userController.createUser);

module.exports = router;
