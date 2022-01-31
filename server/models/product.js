const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      text: true,
    },    
    category: {
      type: String,
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    selling_price: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    actual_price: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    discount: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    images: {
      type: Array,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);