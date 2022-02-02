const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    orderedBy: { type: ObjectId, ref: "User" },
    productName: { type: String, required: true },   
    sellingPrice: Number,
    image: { type: String, required: true},
    quantity: Number,
    status: {
      type: String,
      trim: true,
      default: 'Order Placed',
      enum: [
        "Order Placed",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);