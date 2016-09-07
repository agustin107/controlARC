/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  commerce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commerce'
  },
  account: {
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId
  },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the update_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export default mongoose.model('User', userSchema);
