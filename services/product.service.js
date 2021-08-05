var productModel = require("../models/product.model");

module.exports = {
    addProduct(name, price, vendor) {
        let theNewProduct = new productModel({
            name: name,
            price: price,
            vendor: vendor,
        });
        theNewProduct.save();
    }
}