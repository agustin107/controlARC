import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const accountSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  created_at: Date,
  updated_at: Date
});

accountSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the update_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

accountSchema.plugin(passportLocalMongoose);

export default mongoose.model('Account', accountSchema);
