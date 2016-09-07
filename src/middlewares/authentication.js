/*
  * Npm dependencies
 */
import passport from 'passport';

/*
  * Model dependency
 */
import User from '../models/user';

passport.authMiddleware = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      if (!res.locals.user) {
        User.findOne({ 'account': req.user._id }, (err, user) => {
          res.locals.user = user;
          res.locals.account = req.user;
          req.session.user = user;
        });
      }

      return next();
    }

    res.redirect('/login');
  }
};