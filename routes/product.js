var express = require("express");
var router = express.Router();
var productModel = require("../models/product.model");

router.get("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "All Products", products: results || [] });
  });
});

router.post("/", (req, res) => {
  let theNewProduct = new productModel({
    name: req.body.name,
    price: req.body.price,
    vendor: req.body.vendor,
  });
  theNewProduct.save((err, results) => {
    if (err) throw err;
    res.json({ message: "Product Added", product: results || {} });
  });
});

router.put("/", (req, res) => {
  productModel.updateOne({ _id: req.params.id }, req.body, (err, result) => {
    if (err) throw err;
    res.json({ message: "Product Updated", data: result });
  });
});

router.delete("/", (req, res) => {
  productModel.deleteOne(req.body, (err, result) => {
    if (err) throw err;
    res.json({ message: "Product Deleted", data: result });
  });
});

module.exports = router;
