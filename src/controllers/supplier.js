/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

/*
  * Model dependency
 */
import Supplier from '../models/supplier';

const router = express.Router();

router.get('/', passport.authMiddleware(), (req, res, next) => {
  Supplier.find((err, suppliers) => {
    res.render('pages/supplier/index', {
      title: 'Proveedores',
      section: 'Listado de Proveedores',
      suppliers: suppliers
    });
  });
});

router.get('/new', passport.authMiddleware(), (req, res, next) => {
  res.render('pages/supplier/new', {
    title: 'Proveedores',
    section: 'Nuevo Proveedor'
  });
});

router.post('/new', passport.authMiddleware(), (req, res, next) => {
  let newCategory = new Supplier({
    name: req.body.name,
    description: req.body.description
  });

  newCategory.save((err, supplier) => {
    if (!err) {
      res.redirect('/supplier');
    }
  });
});

export default router;