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
      type: Number,
      required: true,
    },
    actual_price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
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