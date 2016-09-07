/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const commerceSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Commerce', commerceSchema);
