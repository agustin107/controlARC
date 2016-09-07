/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('ProductCategory', productCategorySchema);
