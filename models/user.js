const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },

    address: String,
    gender: { type: String, default: 'male' },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);