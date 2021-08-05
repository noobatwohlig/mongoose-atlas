var assert = require('assert');
var productService = require('../services/product.service');

describe('Product Transaction Rollback', () => {

    describe('AddProduct', () => {
        it("Adding Product to Product collection", async () => {
            let testResult = await productService.addProduct('MacBook Air', 100000, 'Apple Inc.');
            if (testResult) {
                console.log("Added Product succesfully in both");
            } else {
                console.log("Transaction Aborted due to Failure, rolling back...");
            }
        })
    });
});