/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

/*
  * Model dependency
 */
import Product from '../models/product';
import Supplier from '../models/supplier';
import Category from '../models/productCategory';

const router = express.Router();

router.get('/new', passport.authMiddleware(), (req, res, next) => {
  Supplier.find((err, suppliers) => {
    if (!err) {
      Category.find((err, categories) => {
        if (!err) {
          res.render('pages/product/new', {
            title: 'Productos',
            section: 'Nuevo Producto',
            categories: categories,
            suppliers: suppliers
          });
        }
      });
    }
  });
});

router.post('/new', passport.authMiddleware(), (req, res, next) => {
  let newProduct = new Product({
    code: req.body.code,
    category: req.body.category,
    supplier: req.body.supplier,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.stock,
    commerce: req.body.commerce
  });

  newProduct.save((err, category) => {
    if (!err) {
      res.redirect('/stock');
    } else {
      console.log(err);
    }
  });
});

export default router;