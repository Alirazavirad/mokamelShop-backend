const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "USER",
    },
    img: {
      type: String,
      required: false,
    },
    isban: {
      type: Boolean,
      required: true,
    },
    cart: [
      {
        count: { type: Number, required: true },
        product: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", schema);
module.exports = UserModel;
