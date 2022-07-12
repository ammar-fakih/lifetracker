const express = require('express');

const Tracking = require('../models/tracking');
const router = express.Router();
const security = require('../middleware/security');
const types = ['exercise', 'sleep', 'nutrition'];

//
// Routes
//

router.get('/', security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    let logs = {};
    for (const type of types) {
      logs[type] = await Tracking.fetchLogs(email, type);
    }
    return res.status(200).json(logs);
  } catch (e) {
    next(e);
  }
});

router.get(
  '/:type',
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // take user email and password and  attempt to authenticate
      const { type } = req.params;
      const { email } = res.locals.user;
      const response = await Tracking.fetchLogs(email, type);
      return res.status(200).json({ [type]: response });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/:type',
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // take user information and attempt create in user in database
      const { type } = req.params;
      const data = req.body[type];
      const { email } = res.locals.user;
      const log = await Tracking.addToLog(email, data, type);
      return res.status(201).json({ log });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
