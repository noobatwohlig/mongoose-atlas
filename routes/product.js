var express = require("express");
var router = express.Router();
var productModel = require("../models/product.model");

router.get("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "all products", products: results || [] });
  });
});

router.post("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "all products", products: results || [] });
  });
});

router.put("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "all products", products: results || [] });
  });
});

module.exports = router;
