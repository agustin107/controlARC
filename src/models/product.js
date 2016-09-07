/*
  * Npm Dependencies
 */
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: String,
  category: {
    ref: 'ProductCategory',
    type: mongoose.Schema.Types.ObjectId
  },
  supplier: {
    ref: 'Supplier',
    type: mongoose.Schema.Types.ObjectId
  },
  name: String,
  brand: String,
  description: String,
  stock: Number,
  price: Number,
  commerce: {
    ref: 'Commerce',
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model('Product', productSchema);
