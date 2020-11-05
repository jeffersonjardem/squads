import mongoose from '../database/index';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  }
});

ProductSchema.set('timestamps', true);

const Product = mongoose.model('product', ProductSchema);

export default Product;
