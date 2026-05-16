import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    productDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { collection: 'products', timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;