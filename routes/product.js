var express = require("express");
var router = express.Router();
var productModel = require('../models/product.model');
var amazonModel = require("../models/amazon.model");
var mongoose = require('../configs/db.config');

router.get("/", (req, res) => {
  productModel.find({}, (err, results) => {
    if (err) throw err;
    res.json({ message: "All Products", products: results || [] });
  });
});

router.post("/", async (req, res) => {

  let session = await mongoose.startSession({ new: true });
  session.startTransaction();

  try {
    await productModel.create([{
      name: req.body.name,
      price: req.body.price,
      vendor: req.body.vendor
    }], { session: session });

    /**
     * Uncomment Below To 
     * Generating Error Intensionally to check rolling back 1st insertion or not
     */

    //throw new Error('I will stop from saving 2nd product');

    await amazonModel.create([{
      name: req.body.name,
      price: req.body.price,
      vendor: req.body.vendor
    }], { session: session });

    await session.commitTransaction();
    session.endSession();
    res.json({ 'message': "Added Product succesfully in both" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ "message": "Transaction Aborted due to Failure, rolling back..." + err });
  }
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
