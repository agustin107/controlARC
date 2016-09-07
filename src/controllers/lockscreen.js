/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authMiddleware(), (req, res, next) => {
  res.render('pages/lockscreen/index', {
    title: 'Pantalla de bloqueo',
    layout: 'page-blank'
  });
});

export default router;