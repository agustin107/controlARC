/*
  * Npm Dependencies
 */
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import Account from '../models/account';
import User from '../models/user';
import Commerce from '../models/commerce';

const router = express.Router();

/*
  * Get Profile page
 */
router.get('/', (req, res, next) => {
  res.render('pages/register/index', {
    title: 'Registro',
    layout: 'page-blank'
  });
});

router.post('/', (req, res, next) => {
  // Get values from POST request.
  let email = req.body.email;
  let password = req.body.password;
  let fullname = req.body.fullname;
  let name = fullname.split(' ')[0];
  let lastname = fullname.split(' ').slice(1).join(" ");

  Account.register(new Account({
    username: email
  }), password, (err, account) => {
    if (err) {
      return res.render('pages/register/index', {
        layout: 'page-blank',
        account: account
      });
    } else {
      // Create Commerce for user
      let newCommerce = new Commerce({
        name: '',
        description: ''
      });

      newCommerce.save((err, commerce) => {
        req.commerce = commerce;

        let newUser = new User({
          name: name,
          lastname: lastname,
          commerce: commerce._id,
          account: account._id
        });

        newUser.save();
      });
    }

    res.redirect('/login');
  });

});

export default router;