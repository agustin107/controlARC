import $config from './config';
import crypto from 'crypto';

const salt = $config().security.secret;

export function md5(str) {
  return crypto
    .createHash('md5')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}

export function sha1(str) {
  return crypto
    .createHash('sha1')
    .update(`${salt}${str.toString()}`)
    .digest('hex');
}
