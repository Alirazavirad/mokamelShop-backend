const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
const ProductModel = mongoose.model("Product", schema);
module.exports = ProductModel;
