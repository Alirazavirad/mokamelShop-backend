const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
  },
});
const BanModel =  mongoose.model('Ban',schema)
module.exports = BanModel
