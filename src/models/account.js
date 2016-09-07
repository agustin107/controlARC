import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const accountSchema = new mongoose.Schema({
  local: {
    username: String,
    password: String
  }
});

accountSchema.plugin(passportLocalMongoose);

export default mongoose.model('Account', accountSchema);