import $config from './config';
import _ from 'lodash';
import { getParamsFromUrl } from './utils/url';

export default {
  getCurrentLanguage: getCurrentLanguage,
  getLanguagePath: getLanguagePath,
  load: load
};

function getCurrentLanguage(url) {
  const params = getParamsFromUrl(url);

  return _.includes($config().languages.list, params[0]) ? params[0] : $config().languages.default;
}

function getLanguagePath(url) {
  const params = getParamsFromUrl(url);

  return _.includes($config().languages.list, params[0]) ? `/${params[0]}` : '';
}

function load(language) {
  let content;

  if (_.includes($config().languages.list, language)) {
    try {
      content = require(`../locales/i18n/${language}`);
    } catch (e) {
      content = require(`../locales/i18n/${$config().languages.default}`);
    }
  } else {
    content = require(`../locales/i18n/${$config().languages.default}`);
  }

  return content;
}
