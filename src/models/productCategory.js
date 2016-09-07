/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  created_at: Date,
  updated_at: Date
});

productCategorySchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the update_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export default mongoose.model('ProductCategory', productCategorySchema);
