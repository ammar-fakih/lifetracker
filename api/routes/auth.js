const express = require('express');
const User = require('../models/users');
const { createUserJwt } = require('../utils/tokens');
const { requireAuthenticatedUser } = require('../middleware/security');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    // take user email and password and  attempt to authenticate
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ token, user });
  } catch (e) {
    next(e);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    // take user information and attempt create in user in database
    const user = await User.register(req.body);
    const token = createUserJwt(user);
    console.log(user, token);
    return res.status(201).json({ token, user });
  } catch (e) {
    next(e);
  }
});

router.get('/me', requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = User.makePublicUser(user);
    return res.status(200).json({ user: publicUser, orders });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
