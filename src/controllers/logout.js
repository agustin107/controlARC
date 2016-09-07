/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authMiddleware(), (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

export default router;