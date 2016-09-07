/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  commerce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commerce'
  },
  account: {
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model('User', userSchema);
