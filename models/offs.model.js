const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  maxUse: {
    type: Number,
    required: true,
  },
  uses: {
    type: Number,
    default: 0,
    required: false,
  },
});
const offsModel = mongoose.model("Off", schema);
module.exports = offsModel
