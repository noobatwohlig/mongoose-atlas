var express = require("express");
var router = express.Router();
var amazonService = require('../services/amazon.service');
var productService = require('../services/product.service');
var productModel = require('../models/product.model');
var monooose = require('../configs/db.config');

router.get("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "All Products", products: results || [] });
  });
});

router.post("/", (req, res) => {

  let session = null;

  monooose.startSession().then(db => {

    session = db;
    session.startTransaction();

    productService.addProduct(
      req.body.name,
      req.body.price,
      req.body.vendor
    );

    /**
     * Uncomment Below To 
     * Generating Error Intensionally to check rolling back 1st insertion or not
     */

    throw new Error('I will stop from saving 2nd product');

    amazonService.addProduct(
      req.body.name,
      req.body.price,
      req.body.vendor
    );

    session.commitTransaction();
    res.json({ 'message': "Added Product succesfully in both" });

  }).catch(err => {
    session.abortTransaction();
    res.json({ "message": "Transaction Aborted due to Failure, rolling back..." + err });
  }).finally(() => {
    session.endSession();
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
