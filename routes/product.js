var express = require("express");
var router = express.Router();
var productModel = require('../models/product.model');
var productService = require('../services/product.service');

router.get("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "All Products", products: results || [] });
  });
});

router.post("/", async (req, res) => {
  await productService.addProduct(
    req.body.name,
    req.body.price,
    req.body.vendor
  ).then((result) => {
    if (result) {
      res.json({ 'message': "Added Product succesfully in both" });
    } else {
      res.json({ "message": "Transaction Aborted due to Failure, rolling back..." });
    }
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
