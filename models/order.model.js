const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      count: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
});
const OrderModel = mongoose.model("order", schema);
module.exports = OrderModel;
