const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://abs:123@hero-cluster.u6nvl.mongodb.net/hero?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection success");
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  vendor: String,
});

module.exports = mongoose.model("products", productSchema);
