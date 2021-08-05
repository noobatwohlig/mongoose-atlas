const mongoose = require("../configs/db.config");

const amazonSchema = new mongoose.Schema({
  name: String,
  price: Number,
  vendor: String,
});

module.exports = mongoose.model("amazon", amazonSchema);
