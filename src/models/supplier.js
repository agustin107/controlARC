/*
  * Npm dependencies
 */
import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Supplier', supplierSchema);
