/*
  * Npm Dependencies
 */
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  category: {
    ref: 'ProductCategory',
    type: mongoose.Schema.Types.ObjectId
  },
  supplier: {
    ref: 'Supplier',
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  brand: String,
  description: String,
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  commerce: {
    ref: 'Commerce',
    type: mongoose.Schema.Types.ObjectId
  },
  created_at: Date,
  updated_at: Date
});

productSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the update_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export default mongoose.model('Product', productSchema);
