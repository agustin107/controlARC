/*
  * Dependencies
 */
import express from 'express';
import path from 'path';
//import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import stylus from 'stylus';

/*
  * Helpers
 */
import $config from './lib/config';
import hbsHelpers from './lib/handlebars';

/*
  * Router
 */
import router from './router';

const app = express();

if (!$config().html.css.stylusPreCompile) {
  // Set and configurate stylus middleware
  app.use(
    stylus.middleware({
      src: path.join(__dirname, '/stylus'),
      dest: path.join(__dirname, '/public/css'),
      compile: (str, path) => {
        return stylus(str).set('filename', path).set('compress', false);
      }
    })
  );
}

// Sending config to templates
app.use((req, res, next) => {
  res.locals.config = $config();
  next();
});

// Handlebars setup
app.engine($config().views.engine, exphbs({
  extname: $config().views.extension,
  defaultLayout: $config().views.layout,
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: hbsHelpers
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', $config().views.engine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
router(app);

// Disabling x-powered-by
app.disable('x-powered-by');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Listening port..
app.listen($config().serverPort || 3000);

export default app;
