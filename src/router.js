import $config from './lib/config';
import i18n from './lib/i18n';
import {isMobile} from './lib/utils/device';

import homeController from './app/home/home.controller';
import dashboardController from './app/dashboard/dashboard.controller';

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
  app.use('/', homeController);
  app.use(`/:language(${availablesLanguages})`, homeController);
  app.use(`/:language(${availablesLanguages})/dashboard`, dashboardController);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Development error handler
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // Production error habdler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};
