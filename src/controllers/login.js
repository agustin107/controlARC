import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/login/index', {
    title: 'Login',
    layout: 'page-blank'
  });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

export default router;
