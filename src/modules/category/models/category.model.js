import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: 'categories' }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;