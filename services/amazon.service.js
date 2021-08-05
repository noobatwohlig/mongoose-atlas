var amazonModel = require("../models/amazon.model");

module.exports = {
    addProduct(name, price, vendor) {
        let theNewProduct = new amazonModel({
            name: name,
            price: price,
            vendor: vendor,
        });
        theNewProduct.save();
    }
}