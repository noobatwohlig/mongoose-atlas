const mongoose = require("../configs/db.config");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  vendor: String,
});

module.exports = mongoose.model("products", productSchema);
