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
  Desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
const ArticleModel = mongoose.model("Article", schema);
module.exports = ArticleModel;
