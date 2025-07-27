const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
const CategoryModel = mongoose.model("Category", schema);
module.exports = CategoryModel;
