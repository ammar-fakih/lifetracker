const express = require('express');

const Tracking = require('../models/tracking');
const router = express.Router();
const security = require('../middleware/security');

router.get(
  '/nutrition',
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // take user email and password and  attempt to authenticate
      const user = await Tracking.login(req.body);
      return res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/nutrition',
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // take user information and attempt create in user in database
      const { email } = res.locals.user;
      const log = await Tracking.addToLog(
        email,
        req.body.nutrition,
        'nutrition_logs'
      );
      return res.status(201).json({ log });
    } catch (e) {
      next(e);
    }
  }
);

// router.get('/sleep', security.requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     // take user email and password and  attempt to authenticate
//     const user = await Tracking.login(req.body);
//     return res.status(200).json({ user });
//   } catch (e) {
//     next(e);
//   }
// });

// router.post('/sleep', security.requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     // take user information and attempt create in user in database
//     const { email } = res.locals.user;
//     const log = await Tracking.addToLog(email, "nutrition", req.body.nutrition);
//     return res.status(201).json({ log });
//   } catch (e) {
//     next(e);
//   }
// });

// router.get('/exercise', security.requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     // take user email and password and  attempt to authenticate
//     const user = await Tracking.login(req.body);
//     return res.status(200).json({ user });
//   } catch (e) {
//     next(e);
//   }
// });

// router.post('/e', security.requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     // take user information and attempt create in user in database
//     const { email } = res.locals.user;
//     const log = await Tracking.addToLog(email, "nutrition", req.body.nutrition);
//     return res.status(201).json({ log });
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
