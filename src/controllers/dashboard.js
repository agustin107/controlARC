/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET dashboard page. */
router.get('/', passport.authMiddleware(), (req, res, next) => {
  res.render('pages/index', {
    title: 'Dashboard',
    section: 'Dashboard'
  });
});

export default router;
