/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

/*
  * Model dependency
 */
import Product from '../models/product';

const router = express.Router();

router.get('/', passport.authMiddleware(), (req, res, next) => {
  let commerce = req.session.user.commerce;
  Product.find({ commerce: commerce }, (err, products) => {
    if (!err) {
      res.render('pages/stock/index', {
        title: 'Stock',
        section: 'Stock',
        products: products
      });
    }
  });
});

export default router;