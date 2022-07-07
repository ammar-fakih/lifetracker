const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // take user email and password and  attempt to authenticate
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // take user information and attempt create in user in database
    const user = await User.register(req.body); 
    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
