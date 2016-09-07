import $config from '../lib/config';
import i18n from '../lib/i18n';
import {isMobile} from '../lib/utils/device';

import dashboardController from '../controllers/dashboard';
import registerController from '../controllers/register';
import loginController from '../controllers/login';
import logoutController from '../controllers/logout';
import lockscreenController from '../controllers/lockscreen';
import stockController from '../controllers/stock';
import categoryController from '../controllers/category';
import productController from '../controllers/product';
import supplierController from '../controllers/supplier';

export default (app) => {
  const availablesLanguages = $config().languages.list.join('|');
  // en|es|fr

  app.use((req, res, next) => {
    res.__ = res.locals.__ = i18n.load(i18n.getCurrentLanguage(req.url));
    res.locals.config.basePath = `${$config().baseUrl}${i18n.getLanguagePath(req.url)}`;
    res.locals.basePath = res.locals.config.basePath;
    res.locals.currentLanguage = i18n.getCurrentLanguage(req.url);
    res.locals.isMobile = isMobile(req.headers['user-agent']);

    next();
  });

  app.use((req, res, next) => {
    res.locals.css = [
      '/css/style.css'
    ];

    res.locals.topJs = [];
    res.locals.bottomJs = [];

    next();
  });

  // Controllers dispatch
  //app.use(`/:language(${availablesLanguages})/dashboard`, dashboardController);
  app.use('/', dashboardController);
  app.use('/dashboard', dashboardController);
  app.use('/register', registerController);
  app.use('/login', loginController);
  app.use('/logout', logoutController);
  app.use('/lockscreen', lockscreenController);
  app.use('/stock', stockController);
  app.use('/category', categoryController);
  app.use('/product', productController);
  app.use('/supplier', supplierController);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.status(404).render('pages/404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });

  // Development error handler
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('pages/error', {
        message: err.message,
        error: err
      });
    });
  }

  // Production error habdler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: {}
    });
  });
};
