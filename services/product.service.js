var productModel = require('../models/product.model');
var amazonModel = require("../models/amazon.model");
var mongoose = require('../configs/db.config');

module.exports = {
    async addProduct(name, price, vendor) {
        let session = await mongoose.startSession({ new: true });
        session.startTransaction();

        try {
            await productModel.create([{
                name: name,
                price: price,
                vendor: vendor
            }], { session: session });

            /**
             * Uncomment Below To 
             * Generating Error Intensionally to check rolling back 1st insertion or not
             */

            throw new Error('I will stop from saving 2nd product');

            await amazonModel.create([{
                name: name,
                price: price,
                vendor: vendor
            }], { session: session });

            await session.commitTransaction();
            session.endSession();
            return true;
        } catch (err) {
            console.log(err);
            await session.abortTransaction();
            session.endSession();
            return false;
        }
    }
}