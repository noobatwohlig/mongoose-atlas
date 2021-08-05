var assert = require('assert');
var amazonService = require('../services/amazon.service');
var productService = require('../services/product.service');

describe('Product Transaction Rollback', () => {

    describe('AddProduct', () => {
        it("Adding Product to Product collection", () => {
            productService.addProduct('MacBook Air', 100000, 'Apple Inc.');
        })
    });

    // GENERATE AN ERROR FOR TESTING....

    describe('AddProductInAmazon', () => {
        it("Adding Product to Amazon collection", () => {
            amazonService.addProduct('MacBook Air', 100000, 'Apple Inc.');
        })
    });
});