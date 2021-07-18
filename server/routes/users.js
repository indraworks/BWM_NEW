const express = require('express');
const router = express.Router();
const { login, register } = require('../controlers/users');
router.route('/login').post(login).get(login);
router.route('/register').post(register).get(register);
module.exports = router;
