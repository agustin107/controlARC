/*
  * Npm Dependencies
 */
import mongoose from 'mongoose';

export default () => {
  mongoose.connect('mongodb://localhost/controlarc');
};