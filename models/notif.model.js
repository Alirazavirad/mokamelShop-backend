const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: 0,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
});
const NotifModel =  mongoose.model("Notif", schema);
module.exports = NotifModel
