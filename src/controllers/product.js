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

router.get('/', passport.authMiddleware(), (req, res, next) => {
  const productToSearch = req.param('search');
  Product.find({ name: new RegExp(productToSearch, 'i')}, (err, products) => {
    if (products) {
      res.render('pages/stock/index', {
        title: 'Producto',
        section: 'Busqueda de Producto',
        products: products
      });
    } else {
      res.redirect('/stock');
    }
  });
});

router.get('/new', passport.authMiddleware(), (req, res, next) => {
  Supplier.find((err, suppliers) => {
    if (!err) {
      return Category.find((err, categories) => {
        if (!err) {
          return res.render('pages/product/new', {
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
  const newProduct = new Product({
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
      //console.log(err);
    }
  });
});

export default router;
