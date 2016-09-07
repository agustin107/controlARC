/*
  * Npm dependencies
 */
import express from 'express';
import passport from 'passport';

/*
  * Model dependency
 */
import Category from '../models/productCategory';

const router = express.Router();

router.get('/', passport.authMiddleware(), (req, res, next) => {
  Category.find((err, categories) => {
    return res.render('pages/category/index', {
      title: 'Categorias',
      section: 'Listado de Categorias',
      categories: categories
    });
  });
});

router.get('/new', passport.authMiddleware(), (req, res, next) => {
  res.render('pages/category/new', {
    title: 'Categorias',
    section: 'Nueva Categoria'
  });
});

router.post('/new', passport.authMiddleware(), (req, res, next) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description
  });

  newCategory.save((err, category) => {
    if (!err) {
      res.redirect('/category');
    } else {
      res.redirect('/category/new');
    }
  });
});

export default router;
